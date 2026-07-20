import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "DRIVER") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { bookingId, latitude, longitude, accuracy, location, speed } = await req.json();

    if (!bookingId || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ success: false, message: "Booking ID and coordinates required" }, { status: 400 });
    }

    // Verify driver owns this booking
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, driverId: session.user.id },
      include: { customer: { select: { id: true } } },
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found or not assigned to you" }, { status: 404 });
    }

    // Create tracking update with location
    const update = await prisma.trackingUpdate.create({
      data: {
        bookingId,
        status: booking.status,
        description: location ? `Driver at: ${location}` : "Location updated",
        location: location || undefined,
        latitude,
        longitude,
      },
    });

    // Update booking current location
    await prisma.booking.update({
      where: { id: bookingId },
      data: { currentLocation: location || `${latitude}, ${longitude}` },
    });

    // Notify customer
    await prisma.notification.create({
      data: {
        userId: booking.customerId,
        title: "Driver Location Update",
        message: location
          ? `Your driver is near: ${location}`
          : `Your driver location has been updated`,
        type: "INFO",
        link: `/user/bookings/${bookingId}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Location shared",
      data: { update },
    });
  } catch (error) {
    console.error("[DRIVER_TRACKING_POST]", error);
    return NextResponse.json({ success: false, message: "Failed to share location" }, { status: 500 });
  }
}

// GET: Fetch latest driver location for a booking
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json({ success: false, message: "bookingId required" }, { status: 400 });
    }

    // User can only see their own booking's driver location
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        ...(session.user.role === "USER" ? { customerId: session.user.id } : {}),
        ...(session.user.role === "DRIVER" ? { driverId: session.user.id } : {}),
      },
      include: {
        trackingUpdates: {
          where: { latitude: { not: null } },
          orderBy: { timestamp: "desc" },
          take: 1,
        },
        driver: { select: { name: true, phone: true } },
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    const latestLocation = booking.trackingUpdates[0];

    return NextResponse.json({
      success: true,
      data: {
        driver: booking.driver,
        currentLocation: booking.currentLocation,
        latestUpdate: latestLocation
          ? {
              latitude: latestLocation.latitude,
              longitude: latestLocation.longitude,
              timestamp: latestLocation.timestamp,
              location: latestLocation.location,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("[DRIVER_TRACKING_GET]", error);
    return NextResponse.json({ success: false, message: "Failed" }, { status: 500 });
  }
}