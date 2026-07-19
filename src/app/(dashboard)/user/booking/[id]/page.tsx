import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../lib/prisma";
import BookingDetailClient from "./bookingClientDetails";


export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const rawBooking = await prisma.booking.findFirst({
    where: {
      id,
      customerId: session.user.id,
    },
    include: {
      trackingUpdates: { orderBy: { timestamp: "desc" } },
      driver: { select: { name: true, phone: true } },
      customer: { select: { name: true, email: true, phone: true } },
      payments: true,
      reviews: true,
    },
  });

  if (!rawBooking) redirect("/user/bookings");

  // Serialize Date & Decimal fields
  const booking = {
    ...rawBooking,
    movingDate: rawBooking.movingDate.toISOString(),
    createdAt: rawBooking.createdAt.toISOString(),
    updatedAt: rawBooking.updatedAt.toISOString(),
    completedAt: rawBooking.completedAt?.toISOString() || null,
    estimatedAmount: rawBooking.estimatedAmount
      ? Number(rawBooking.estimatedAmount)
      : null,
    finalAmount: rawBooking.finalAmount
      ? Number(rawBooking.finalAmount)
      : null,
    discountAmount: rawBooking.discountAmount
      ? Number(rawBooking.discountAmount)
      : 0,
    taxAmount: rawBooking.taxAmount ? Number(rawBooking.taxAmount) : 0,
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

  return <BookingDetailClient booking={booking} />;
}