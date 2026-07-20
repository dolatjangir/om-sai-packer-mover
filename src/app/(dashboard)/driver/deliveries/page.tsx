import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";
import DriverDeliveriesClient from "./DriverDeliveriesClient";


export default async function DriverDeliveriesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "DRIVER") redirect("/user");

  const bookings = await prisma.booking.findMany({
    where: { driverId: session.user.id },
    include: {
      customer: { select: { name: true, phone: true } },
      trackingUpdates: { orderBy: { timestamp: "desc" }, take: 1 },
    },
    orderBy: { movingDate: "desc" },
    take: 50,
  });

  const serialized = bookings.map((b) => ({
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

  return <DriverDeliveriesClient bookings={serialized} />;
}