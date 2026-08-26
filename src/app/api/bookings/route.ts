import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";
import {
  generateBookingNumber,
  mapMoveTypeToServiceType,
  generateTrackingCode,
} from "./utils";
import { auth } from "../../../auth";
import { prisma } from "../../../../lib/prisma";

// ─── Validation Schema ───────────────────────────────────────────────

const bookingSchema = z.object({
  moveType: z.enum(["local", "intercity", "office", "vehicle"]),
  moveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  moveTime: z.string().min(1, "Time slot is required"),
  fromAddress: z.string().min(5, "Source address is too short"),
  fromCity: z.string().min(2, "Source city is required"),
  fromPincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  toAddress: z.string().min(5, "Destination address is too short"),
  toCity: z.string().min(2, "Destination city is required"),
  toPincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  roomCount: z.string(),
  items: z.array(z.string()).min(1, "Select at least one item"),
  specialItems: z.array(z.string()).optional().default([]),
  notes: z.string().optional().default(""),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Valid email is required"),
  altPhone: z.string().optional().default(""),
});

// ─── POST: Create New Booking ────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // 1. Auth check — using NextAuth v5 auth() helper
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    // 2. Parse & validate body
    const body = await req.json();
    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 3. Check if user exists and update profile if needed
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Update user profile with contact details if empty
    const updateData: Record<string, string> = {};
    if (!user.name && data.fullName) updateData.name = data.fullName;
    if (!user.phone && data.phone) updateData.phone = data.phone;
    if (!user.email && data.email) updateData.email = data.email;

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: updateData,
      });
    }

    // 4. Calculate estimated amount
    const estimatedAmount = calculateEstimate(data);

    // 5. Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        customerId: session.user.id,
        serviceType: mapMoveTypeToServiceType(data.moveType),
        status: "PENDING",
        fromAddress: data.fromAddress,
        fromCity: data.fromCity,
        fromState: "",
        fromPincode: data.fromPincode,
        toAddress: data.toAddress,
        toCity: data.toCity,
        toState: "",
        toPincode: data.toPincode,
        itemCount: data.items.length,
        inventory: {
          roomCount: data.roomCount,
          items: data.items,
          specialItems: data.specialItems,
          notes: data.notes,
        },
        movingDate: new Date(data.moveDate),
        preferredTime: data.moveTime,
        estimatedAmount: estimatedAmount,
        finalAmount: null,
        discountAmount: 0,
        taxAmount: Math.round(estimatedAmount * 0.18 * 100) / 100,
        paymentStatus: "PENDING",
        trackingCode: generateTrackingCode(),
        customerNotes: data.notes,
        adminNotes: null,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    // 6. Create initial tracking update
    await prisma.trackingUpdate.create({
      data: {
        bookingId: booking.id,
        status: "PENDING",
        description: "Booking received. Awaiting admin confirmation.",
        location: data.fromCity,
      },
    });

    // 7. Create notification for user
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Booking Confirmed",
        message: `Your booking #${booking.bookingNumber} has been received. Our team will contact you shortly.`,
        type: "SUCCESS",
        link: `/user/bookings/${booking.id}`,
      },
    });

    // 8. Create notification for all admins
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true },
    });

    if (admins.length > 0) {
      await prisma.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          title: "New Booking Received",
          message: `New booking #${booking.bookingNumber} from ${data.fullName} (${data.fromCity} → ${data.toCity})`,
          type: "INFO" as const,
          link: `/admin/bookings/${booking.id}`,
        })),
      });
    }

    // 9. Also create a lead entry for tracking
    await prisma.lead.create({
      data: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        source: "WEBSITE",
        serviceType: mapMoveTypeToServiceType(data.moveType),
        fromCity: data.fromCity,
        toCity: data.toCity,
        fromAddress: data.fromAddress,
        toAddress: data.toAddress,
        movingDate: new Date(data.moveDate),
        budget: estimatedAmount,
        message: data.notes || undefined,
        status: "CONVERTED",
      },
    });

    // 10. Return success
    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        data: {
          booking: {
            id: booking.id,
            bookingNumber: booking.bookingNumber,
            status: booking.status,
            serviceType: booking.serviceType,
            fromCity: booking.fromCity,
            toCity: booking.toCity,
            movingDate: booking.movingDate,
            estimatedAmount: booking.estimatedAmount,
            trackingCode: booking.trackingCode,
            createdAt: booking.createdAt,
          },
          customer: booking.customer,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BOOKING_POST_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ─── GET: Fetch User Bookings ────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      customerId: session.user.id,
    };

    if (status && status !== "all") {
      where.status = status.toUpperCase();
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          customer: {
            select: { name: true, email: true, phone: true },
          },
          driver: {
            select: { name: true, phone: true },
          },
          _count: {
            select: { trackingUpdates: true, payments: true },
          },
        },
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("[BOOKING_GET_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ─── Helper: Calculate Estimate ──────────────────────────────────────

function calculateEstimate(data: z.infer<typeof bookingSchema>): number {
  let base = 0;
  switch (data.moveType) {
    case "local":
      base = 3000;
      break;
    case "intercity":
      base = 8000;
      break;
    case "office":
      base = 15000;
      break;
    case "vehicle":
      base = 5000;
      break;
  }

  const itemMultiplier = 1 + data.items.length * 0.15;
  const roomMultiplier = parseInt(data.roomCount) * 0.5 || 1;
  const specialMultiplier =
    data.specialItems.length > 0 && !data.specialItems.includes("none")
      ? 1.3
      : 1;

  return Math.round(base * itemMultiplier * roomMultiplier * specialMultiplier);
}