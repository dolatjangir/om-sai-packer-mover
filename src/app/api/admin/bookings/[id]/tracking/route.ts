import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../../lib/prisma";


export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const { description, location, status } = await req.json();

    if (!description?.trim()) {
      return NextResponse.json({ success: false, message: "Description required" }, { status: 400 });
    }

    const update = await prisma.trackingUpdate.create({
      data: {
        bookingId: id,
        status: status || "IN_TRANSIT",
        description,
        location: location || undefined,
      },
    });

    const booking = await prisma.booking.findUnique({
      where: { id },
      select: { customerId: true, bookingNumber: true },
    });

    if (booking) {
      await prisma.notification.create({
        data: {
          userId: booking.customerId,
          title: "Shipment Update",
          message: `Update for #${booking.bookingNumber}: ${description}`,
          type: "INFO",
          link: `/user/bookings/${id}`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Update added",
      data: { update },
    });
  } catch (error) {
    console.error("[ADMIN_TRACKING_POST]", error);
    return NextResponse.json(
      { success: false, message: "Failed to add update" },
      { status: 500 }
    );
  }
}