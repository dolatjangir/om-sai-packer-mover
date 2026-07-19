// app/(dashboard)/user/tracking/page.tsx

import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";
import TrackingClient from "./clientTracking";


export default async function TrackingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const rawBookings = await prisma.booking.findMany({
    where: {
      customerId: session.user.id,
      status: { in: ["PENDING", "CONFIRMED", "PICKED_UP", "IN_TRANSIT"] },
    },
    include: {
      trackingUpdates: { orderBy: { timestamp: "desc" } },
      driver: { select: { name: true, phone: true } },
      customer: { select: { name: true, phone: true } },
    },
    orderBy: { movingDate: "desc" },
  });

  // ✅ SERIALIZE: Convert Date & Decimal to strings/numbers
  const initialBookings = rawBookings.map((booking) => ({
    ...booking,
    // Dates → ISO strings
    movingDate: booking.movingDate.toISOString(),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
    completedAt: booking.completedAt?.toISOString() || null,
    
    // Decimals → numbers (or strings if you prefer)
    estimatedAmount: booking.estimatedAmount 
      ? Number(booking.estimatedAmount) 
      : null,
    finalAmount: booking.finalAmount 
      ? Number(booking.finalAmount) 
      : null,
    discountAmount: booking.discountAmount 
      ? Number(booking.discountAmount) 
      : null,
    taxAmount: booking.taxAmount 
      ? Number(booking.taxAmount) 
      : null,
    
    // Nested dates
    trackingUpdates: booking.trackingUpdates.map((update) => ({
      ...update,
      timestamp: update.timestamp.toISOString(),
    })),
  }));

  return <TrackingClient initialBookings={initialBookings} />;
}