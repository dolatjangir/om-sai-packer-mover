import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { prisma } from "../../../../lib/prisma";
import { BookingStatus } from "@prisma/client";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  const activeStatuses = [
    BookingStatus.PENDING,
    BookingStatus.CONFIRMED,
    BookingStatus.PICKED_UP,
    BookingStatus.IN_TRANSIT,
  ];

  const [totalBookings, activeMoves, delivered, recent] = await Promise.all([
    // Stats
    prisma.booking.count({ where: { customerId: userId } }),
    prisma.booking.count({
      where: { customerId: userId, status: { in: activeStatuses } },
    }),
    prisma.booking.count({
      where: { customerId: userId, status: BookingStatus.DELIVERED },
    }),

    // Recent bookings (matches your frontend shape exactly)
    prisma.booking.findMany({
      where: { customerId: userId },
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        bookingNumber: true,
        fromCity: true,
        toCity: true,
        status: true,
        itemCount: true,
        serviceType: true,
        createdAt: true,
      },
    }),
  ]);

  const now = new Date();

  const fmtDate = (d: Date) => {
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  const statusLabel: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PICKED_UP: "Picked Up",
    IN_TRANSIT: "In Transit",
    DELIVERED: "Delivered",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };

  const serviceLabel: Record<string, string> = {
    LOCAL_MOVING: "Local Moving",
    INTERCITY_MOVING: "Intercity Moving",
    OFFICE_MOVING: "Office Moving",
    VEHICLE_TRANSPORT: "Vehicle Transport",
    WAREHOUSE_STORAGE: "Warehouse Storage",
    PACKING_ONLY: "Packing Only",
  };

  const recentBookings = recent.map((b) => ({
    id: b.bookingNumber,
    from: b.fromCity,
    to: b.toCity,
    date: fmtDate(b.createdAt),
    status: statusLabel[b.status] || b.status,
    items:
      b.itemCount > 0
        ? `${b.itemCount} items`
        : serviceLabel[b.serviceType] || "Move",
  }));

  return NextResponse.json({
    success: true,
    data: {
      stats: {
        totalBookings,
        activeMoves,
        delivered,
      },
      recentBookings,
    },
  });
}