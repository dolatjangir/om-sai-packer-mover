import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { prisma } from "../../../../../lib/prisma";
import AdminBookingsClient from "./AdminBookingsClient";


export default async function AdminBookingsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/user");

  const [bookings, drivers] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { name: true, email: true, phone: true } },
        driver: { select: { id: true, name: true, phone: true } },
        trackingUpdates: { orderBy: { timestamp: "desc" }, take: 1 },
        payments: true,
      },
      take: 100,
    }),
    prisma.user.findMany({
      where: { role: "DRIVER", status: "ACTIVE" },
      select: { id: true, name: true, phone: true },
      orderBy: { name: "asc" },
    }),
  ]);

  // Serialize
  const serializedBookings = bookings.map((b) => ({
    ...b,
    movingDate: b.movingDate.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    completedAt: b.completedAt?.toISOString() || null,
    estimatedAmount: b.estimatedAmount ? Number(b.estimatedAmount) : null,
    finalAmount: b.finalAmount ? Number(b.finalAmount) : null,
    discountAmount: Number(b.discountAmount),
    taxAmount: Number(b.taxAmount),
    trackingUpdates: b.trackingUpdates.map((u) => ({
      ...u,
      timestamp: u.timestamp.toISOString(),
    })),
    payments: b.payments.map((p) => ({
      ...p,
      amount: Number(p.amount),
      paidAt: p.paidAt.toISOString(),
    })),
  }));

  return (
    <AdminBookingsClient
      initialBookings={serializedBookings}
      drivers={drivers}
    />
  );
}