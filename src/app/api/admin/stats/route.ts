import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { UserRole, UserStatus, BookingStatus } from "@prisma/client";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const activeStatusFilter = {
    in: [
      BookingStatus.PENDING,
      BookingStatus.CONFIRMED,
      BookingStatus.PICKED_UP,
      BookingStatus.IN_TRANSIT,
    ],
  };

  const [
    totalCustomers,
    customersLastMonth,
    activeBookings,
    activeBookingsLastMonth,
    availableDrivers,
    driversLastMonth,
    revenueThisMonth,
    revenueLastMonth,
  ] = await Promise.all([
    // Current absolute counts
    prisma.user.count({ where: { role: UserRole.USER } }),
    prisma.user.count({
      where: { role: UserRole.USER, createdAt: { lt: startOfMonth } },
    }),

    prisma.booking.count({ where: { status: activeStatusFilter } }),
    prisma.booking.count({
      where: { status: activeStatusFilter, createdAt: { lt: startOfMonth } },
    }),

    prisma.user.count({
      where: { role: UserRole.DRIVER, status: UserStatus.ACTIVE },
    }),
    prisma.user.count({
      where: {
        role: UserRole.DRIVER,
        status: UserStatus.ACTIVE,
        createdAt: { lt: startOfMonth },
      },
    }),

    // Revenue: sum finalAmount (non-cancelled only)
    prisma.booking.aggregate({
      where: {
        createdAt: { gte: startOfMonth },
        status: { not: BookingStatus.CANCELLED },
      },
      _sum: { finalAmount: true },
    }),
    prisma.booking.aggregate({
      where: {
        createdAt: { gte: startOfLastMonth, lt: startOfMonth },
        status: { not: BookingStatus.CANCELLED },
      },
      _sum: { finalAmount: true },
    }),
  ]);

  const toNum = (d: unknown) => (d ? Number(d) : 0);
  const currentRev = toNum(revenueThisMonth._sum.finalAmount);
  const lastRev = toNum(revenueLastMonth._sum.finalAmount);

  const pctChange = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? "+100%" : "0%";
    const p = ((curr - prev) / prev) * 100;
    return `${p >= 0 ? "+" : ""}${p.toFixed(0)}%`;
  };

  const fmtRev = (val: number) =>
    val >= 100000
      ? `₹${(val / 100000).toFixed(1)}L`
      : val >= 1000
      ? `₹${(val / 1000).toFixed(0)}K`
      : `₹${val}`;

  return NextResponse.json({
    stats: [
      {
        label: "Total Customers",
        value: totalCustomers.toLocaleString(),
        change: pctChange(totalCustomers, customersLastMonth),
        up: totalCustomers >= customersLastMonth,
        icon: "Users",
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "Active Bookings",
        value: activeBookings.toLocaleString(),
        change: pctChange(activeBookings, activeBookingsLastMonth),
        up: activeBookings >= activeBookingsLastMonth,
        icon: "Calendar",
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        label: "Available Drivers",
        value: availableDrivers.toLocaleString(),
        change: pctChange(availableDrivers, driversLastMonth),
        up: availableDrivers >= driversLastMonth,
        icon: "Truck",
        color: "bg-amber-50 text-amber-600",
      },
      {
        label: "Revenue (MTD)",
        value: fmtRev(currentRev),
        change: pctChange(currentRev, lastRev),
        up: currentRev >= lastRev,
        icon: "DollarSign",
        color: "bg-violet-50 text-violet-600",
      },
    ],
  });
}