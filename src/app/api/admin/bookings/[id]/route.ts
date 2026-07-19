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
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const updateData: Record<string, unknown> = {};

    if (body.status) updateData.status = body.status;
    if (body.driverId !== undefined) updateData.driverId = body.driverId || null;
    if (body.estimatedAmount !== undefined) updateData.estimatedAmount = body.estimatedAmount;
    if (body.finalAmount !== undefined) updateData.finalAmount = body.finalAmount;
    if (body.discountAmount !== undefined) updateData.discountAmount = body.discountAmount;
    if (body.adminNotes !== undefined) updateData.adminNotes = body.adminNotes;

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: { driver: { select: { id: true, name: true, phone: true } } },
    });

    // Tracking update for status change
    if (body.status) {
      await prisma.trackingUpdate.create({
        data: {
          bookingId: id,
          status: body.status,
          description: `Status updated to ${body.status.replace(/_/g, " ")} by admin`,
          location: body.status === "PICKED_UP" ? booking.fromCity : body.status === "DELIVERED" ? booking.toCity : undefined,
        },
      });

      // Notify customer
      await prisma.notification.create({
        data: {
          userId: booking.customerId,
          title: "Booking Update",
          message: `Your booking #${booking.bookingNumber} is now ${body.status.replace(/_/g, " ")}`,
          type: "INFO",
          link: `/user/bookings/${booking.id}`,
        },
      });
    }

    // Notify driver if assigned
    if (body.driverId && body.driverId !== booking.driverId) {
      await prisma.notification.create({
        data: {
          userId: body.driverId,
          title: "New Assignment",
          message: `You have been assigned to booking #${booking.bookingNumber}`,
          type: "INFO",
          link: `/driver/bookings/${booking.id}`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Booking updated",
      data: { booking },
    });
  } catch (error) {
    console.error("[ADMIN_BOOKING_PATCH]", error);
    return NextResponse.json(
      { success: false, message: "Failed to update booking" },
      { status: 500 }
    );
  }
}