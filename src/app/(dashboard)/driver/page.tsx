import { redirect } from "next/navigation";

import DriverDashboardClient from "./DriverDashboardClient";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";

export default async function DriverPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "DRIVER") redirect("/user");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [assignedBookings, completedToday, totalEarnings, driverStats] = await Promise.all([
    prisma.booking.findMany({
      where: {
        driverId: session.user.id,
        status: { in: ["CONFIRMED", "PICKED_UP", "IN_TRANSIT"] },
      },
      include: {
        customer: { select: { name: true, phone: true, address: true } },
        trackingUpdates: { orderBy: { timestamp: "desc" }, take: 1 },
      },
      orderBy: { movingDate: "asc" },
      take: 10,
    }),
    prisma.booking.count({
      where: {
        driverId: session.user.id,
        status: "COMPLETED",
        completedAt: { gte: today, lt: tomorrow },
      },
    }),
    prisma.booking.aggregate({
      where: {
        driverId: session.user.id,
        status: "COMPLETED",
      },
      _sum: { finalAmount: true },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        phone: true,
        image: true,
        createdAt: true,
      },
    }),
  ]);

  const serializedBookings = assignedBookings.map((b) => ({
    ...b,
    movingDate: b.movingDate.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    completedAt: b.completedAt?.toISOString() || null,
    estimatedAmount: b.estimatedAmount ? Number(b.estimatedAmount) : null,
    finalAmount: b.finalAmount ? Number(b.finalAmount) : null,
    trackingUpdates: b.trackingUpdates.map((u) => ({
      ...u,
      timestamp: u.timestamp.toISOString(),
    })),
  }));

  return (
    <DriverDashboardClient
      bookings={serializedBookings}
      completedToday={completedToday}
      totalEarnings={Number(totalEarnings._sum.finalAmount || 0)}
      driver={driverStats}
    />
  );
}