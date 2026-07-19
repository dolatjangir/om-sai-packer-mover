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
    const { driverId } = await req.json();

    if (!driverId) {
      return NextResponse.json(
        { success: false, message: "Driver ID required" },
        { status: 400 }
      );
    }

    const driver = await prisma.user.findFirst({
      where: { id: driverId, role: "DRIVER", status: "ACTIVE" },
    });

    if (!driver) {
      return NextResponse.json(
        { success: false, message: "Driver not found" },
        { status: 404 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        driverId,
        status: "CONFIRMED",
      },
      include: {
        driver: { select: { id: true, name: true, phone: true } },
      },
    });

    // Tracking update
    await prisma.trackingUpdate.create({
      data: {
        bookingId: id,
        status: "CONFIRMED",
        description: `Driver ${driver.name} assigned to your booking`,
        location: booking.fromCity,
      },
    });

    // Notify customer
    await prisma.notification.create({
      data: {
        userId: booking.customerId,
        title: "Driver Assigned",
        message: `${driver.name} has been assigned to your move #${booking.bookingNumber}`,
        type: "SUCCESS",
        link: `/user/bookings/${booking.id}`,
      },
    });

    // Notify driver
    await prisma.notification.create({
      data: {
        userId: driverId,
        title: "New Assignment",
        message: `You have been assigned to booking #${booking.bookingNumber} (${booking.fromCity} → ${booking.toCity})`,
        type: "INFO",
        link: `/driver/bookings/${booking.id}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Driver assigned successfully",
      data: { booking, driver: booking.driver },
    });
  } catch (error) {
    console.error("[ADMIN_ASSIGN_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to assign driver" },
      { status: 500 }
    );
  }
}