import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";


// GET single booking
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const booking = await prisma.booking.findFirst({
      where: {
        id,
        customerId: session.user.id,
      },
      include: {
        customer: {
          select: { name: true, email: true, phone: true },
        },
        driver: {
          select: { name: true, phone: true },
        },
        trackingUpdates: {
          orderBy: { timestamp: "desc" },
        },
        payments: true,
        reviews: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { booking } });
  } catch (error) {
    console.error("[BOOKING_DETAIL_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch booking",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PATCH: Cancel booking
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    if (body.status !== "CANCELLED") {
      return NextResponse.json(
        { success: false, message: "Invalid operation" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findFirst({
      where: {
        id,
        customerId: session.user.id,
        status: "PENDING",
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found or cannot be cancelled",
        },
        { status: 404 }
      );
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    await prisma.trackingUpdate.create({
      data: {
        bookingId: id,
        status: "CANCELLED",
        description: "Booking cancelled by customer",
        location: booking.fromCity,
      },
    });

    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Booking Cancelled",
        message: `Your booking #${booking.bookingNumber} has been cancelled.`,
        type: "WARNING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
      data: { booking: updated },
    });
  } catch (error) {
    console.error("[BOOKING_PATCH_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update booking",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}