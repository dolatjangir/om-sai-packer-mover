import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "../../../../../../lib/prisma";


export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    include: {
      customer: { select: { name: true } },
    },
  });

  const now = new Date();

  const fmtDate = (d: Date) => {
    const diffDays = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const formatted = bookings.map((b) => ({
    id: b.bookingNumber,
    customer: b.customer?.name || "Unknown",
    from: b.fromCity,
    to: b.toCity,
    amount: `₹${Number(
      b.finalAmount ?? b.estimatedAmount ?? 0
    ).toLocaleString()}`,
    status: b.status,
    date: fmtDate(b.createdAt),
  }));

  return NextResponse.json({ bookings: formatted });
}