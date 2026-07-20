import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../../auth";
import { prisma } from "../../../../../../../lib/prisma";


export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "DRIVER") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const { description, location, status } = await req.json();

    const booking = await prisma.booking.findFirst({
      where: { id, driverId: session.user.id },
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    const update = await prisma.trackingUpdate.create({
      data: { bookingId: id, status: status || "IN_TRANSIT", description, location: location || undefined },
    });

    await prisma.notification.create({
      data: {
        userId: booking.customerId,
        title: "Driver Update",
        message: `Update for #${booking.bookingNumber}: ${description}`,
        type: "INFO",
        link: `/user/bookings/${booking.id}`,
      },
    });

    return NextResponse.json({ success: true, data: { update } });
  } catch (error) {
    console.error("[DRIVER_TRACKING]", error);
    return NextResponse.json({ success: false, message: "Failed" }, { status: 500 });
  }
}