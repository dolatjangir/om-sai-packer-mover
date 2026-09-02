import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { UserRole, BookingStatus } from "@prisma/client";
import { prisma } from "../../../../../../lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const drivers = await prisma.user.findMany({
    where: { role: UserRole.DRIVER },
    take: 50,
    include: {
      bookingsAsDriver: {
        where: { status: BookingStatus.COMPLETED },
        select: { id: true },
      },
      reviews: { select: { rating: true } },
    },
  });

  const mapped = drivers
    .map((d) => {
      const deliveries = d.bookingsAsDriver.length;
      const avgRating =
        d.reviews.length > 0
          ? d.reviews.reduce((s, r) => s + r.rating, 0) / d.reviews.length
          : 0;

      return {
        name: d.name || "Unknown Driver",
        deliveries,
        rating: Number(avgRating.toFixed(1)),
        status: d.status === "ACTIVE" ? "Active" : "On Duty",
      };
    })
    .sort((a, b) => b.deliveries - a.deliveries)
    .slice(0, 3);

  return NextResponse.json({ drivers: mapped });
}