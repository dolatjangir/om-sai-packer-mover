import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../../auth";
import { prisma } from "../../../../../../../lib/prisma";


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "DRIVER") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const { status } = await req.json();

    const booking = await prisma.booking.findFirst({
      where: { id, driverId: session.user.id },
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    const validFlow = ["CONFIRMED", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "COMPLETED"];
    const currentIdx = validFlow.indexOf(booking.status);
    const newIdx = validFlow.indexOf(status);

    if (newIdx !== currentIdx + 1) {
      return NextResponse.json({ success: false, message: "Invalid status transition" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { status };
    if (status === "COMPLETED") updateData.completedAt = new Date();

    const updated = await prisma.booking.update({
      where: { id },
      data: updateData,
    });

    await prisma.trackingUpdate.create({
      data: {
        bookingId: id,
        status,
        description: `Driver updated status to ${status.replace(/_/g, " ")}`,
        location: status === "PICKED_UP" ? booking.fromCity : status === "DELIVERED" ? booking.toCity : undefined,
      },
    });

    await prisma.notification.create({
      data: {
        userId: booking.customerId,
        title: "Delivery Update",
        message: `Your booking #${booking.bookingNumber} is now ${status.replace(/_/g, " ")}`,
        type: "INFO",
        link: `/user/bookings/${booking.id}`,
      },
    });

    return NextResponse.json({ success: true, data: { booking: updated } });
  } catch (error) {
    console.error("[DRIVER_STATUS]", error);
    return NextResponse.json({ success: false, message: "Failed" }, { status: 500 });
  }
}