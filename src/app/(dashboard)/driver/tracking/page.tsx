import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { auth } from "../../../../auth";
import DriverTrackingClient from "./DriverTrackingClient";


export default async function DriverTrackingPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "DRIVER") redirect("/user");

  // Get driver's active deliveries (IN_TRANSIT status)
  const activeBookings = await prisma.booking.findMany({
    where: {
      driverId: session.user.id,
      status: { in: ["PICKED_UP", "IN_TRANSIT"] },
    },
    include: {
      customer: { select: { name: true, phone: true } },
      trackingUpdates: { orderBy: { timestamp: "desc" }, take: 1 },
    },
    orderBy: { movingDate: "asc" },
  });

  const serializedBookings = activeBookings.map((b) => ({
    ...b,
    movingDate: b.movingDate.toISOString(),
    createdAt: b.createdAt.toISOString(),
    trackingUpdates: b.trackingUpdates.map((u) => ({
      ...u,
      timestamp: u.timestamp.toISOString(),
    })),
  }));

  return <DriverTrackingClient activeBookings={serializedBookings} driverId={session.user.id} />;
}