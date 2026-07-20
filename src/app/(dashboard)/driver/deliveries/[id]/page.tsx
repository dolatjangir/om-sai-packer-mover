import { redirect } from "next/navigation";

import DriverDeliveryDetailClient from "./DriverDeliveryDetailClient";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../lib/prisma";

export default async function DriverDeliveryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "DRIVER") redirect("/user");

  const { id } = await params;

  const booking = await prisma.booking.findFirst({
    where: { id, driverId: session.user.id },
    include: {
      customer: { select: { name: true, phone: true, email: true } },
      trackingUpdates: { orderBy: { timestamp: "desc" } },
    },
  });

  if (!booking) redirect("/driver/deliveries");

  const serialized = {
    ...booking,
    movingDate: booking.movingDate.toISOString(),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
    completedAt: booking.completedAt?.toISOString() || null,
    estimatedAmount: booking.estimatedAmount ? Number(booking.estimatedAmount) : null,
    finalAmount: booking.finalAmount ? Number(booking.finalAmount) : null,
    trackingUpdates: booking.trackingUpdates.map((u) => ({
      ...u,
      timestamp: u.timestamp.toISOString(),
    })),
  };

  return <DriverDeliveryDetailClient booking={serialized} />;
}