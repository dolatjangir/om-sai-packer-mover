import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../lib/prisma";


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PICKED_UP",
      "IN_TRANSIT",
      "DELIVERED",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    // Add tracking update
    await prisma.trackingUpdate.create({
      data: {
        bookingId: id,
        status,
        description: `Status updated to ${status.replace(/_/g, " ")} by admin`,
        location: status === "PICKED_UP" ? booking.fromCity : status === "DELIVERED" ? booking.toCity : undefined,
      },
    });

    // Notify customer
    await prisma.notification.create({
      data: {
        userId: booking.customerId,
        title: "Booking Update",
        message: `Your booking #${booking.bookingNumber} is now ${status.replace(/_/g, " ")}`,
        type: "INFO",
        link: `/user/bookings/${booking.id}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Status updated",
      data: { booking },
    });
  } catch (error) {
    console.error("[ADMIN_STATUS_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to update status" },
      { status: 500 }
    );
  }
}