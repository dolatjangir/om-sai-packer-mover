import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../lib/prisma";
import AdminBookingDetailClient from "./AdminBookingDetailClient";


export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/user");

  const { id } = await params;

  const rawBooking = await prisma.booking.findUnique({
    where: { id },
    include: {
      customer: { select: { id: true, name: true, email: true, phone: true } },
      driver: { select: { id: true, name: true, phone: true } },
      trackingUpdates: { orderBy: { timestamp: "desc" } },
      payments: true,
      reviews: true,
    },
  });

  if (!rawBooking) redirect("/admin/bookings");

  const drivers = await prisma.user.findMany({
    where: { role: "DRIVER", status: "ACTIVE" },
    select: { id: true, name: true, phone: true },
    orderBy: { name: "asc" },
  });

  // Serialize
  const booking = {
    ...rawBooking,
    movingDate: rawBooking.movingDate.toISOString(),
    createdAt: rawBooking.createdAt.toISOString(),
    updatedAt: rawBooking.updatedAt.toISOString(),
    completedAt: rawBooking.completedAt?.toISOString() || null,
    estimatedAmount: rawBooking.estimatedAmount ? Number(rawBooking.estimatedAmount) : null,
    finalAmount: rawBooking.finalAmount ? Number(rawBooking.finalAmount) : null,
    discountAmount: Number(rawBooking.discountAmount),
    taxAmount: Number(rawBooking.taxAmount),
    trackingUpdates: rawBooking.trackingUpdates.map((u) => ({
      ...u,
      timestamp: u.timestamp.toISOString(),
    })),
    payments: rawBooking.payments.map((p) => ({
      ...p,
      amount: Number(p.amount),
      paidAt: p.paidAt.toISOString(),
    })),
  };

  return <AdminBookingDetailClient booking={booking} drivers={drivers} />;
}