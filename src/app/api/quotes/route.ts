import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";
import { prisma } from "../../../../lib/prisma";

// ─── Validation Schema ───────────────────────────────────────────────

const quoteSchema = z.object({
  moveType: z.enum(["residential", "office", "vehicle"],  {
      error: "Please select a service type",
    }),
  movingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  pickupLocation: z.string().min(2, "Pickup location is required"),
  deliveryLocation: z.string().min(2, "Delivery location is required"),
  propertyFrom: z.string().optional(),
  propertyTo: z.string().optional(),
  rooms: z.string().optional(),
  approxGoods: z.string().optional(),
  fullName: z.string().min(2, "Full name is required"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Valid 10-digit mobile number required"),
  emailAddress: z.string().email("Valid email required").optional().or(z.literal("")),
  additionalRequirements: z.string().optional(),
  agreeToTerms: z.literal(true, {
   message: "You must accept the terms",
  }),
});

// ─── POST: Create Quote Request (Lead) ───────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = quoteSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Map moveType to ServiceType enum
    const serviceTypeMap: Record<string, string> = {
      residential: "LOCAL_MOVING",
      office: "OFFICE_MOVING",
      vehicle: "VEHICLE_TRANSPORT",
    };

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name: data.fullName,
        email: data.emailAddress || `${data.mobileNumber}@temp.com`, // fallback email
        phone: data.mobileNumber,
        source: "WEBSITE",
        serviceType: serviceTypeMap[data.moveType] as any,
        fromCity: data.pickupLocation,
        toCity: data.deliveryLocation,
        fromAddress: data.propertyFrom || undefined,
        toAddress: data.propertyTo || undefined,
        movingDate: new Date(data.movingDate),
        message: data.additionalRequirements || undefined,
        status: "NEW",
      },
    });

    // Create notification for all admins
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true },
    });

    if (admins.length > 0) {
      await prisma.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          title: "New Quote Request",
          message: `${data.fullName} requested a quote for ${data.moveType} move (${data.pickupLocation} → ${data.deliveryLocation})`,
          type: "INFO" as const,
          link: `/admin/leads/${lead.id}`,
        })),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully",
        data: {
          leadId: lead.id,
          name: data.fullName,
          phone: data.mobileNumber,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[QUOTE_POST_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit quote request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ─── GET: Fetch All Quote Requests (Admin Only) ────────────────────

export async function GET(req: NextRequest) {
  try {
    // You can add auth check here for admin access
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status && status !== "all") {
      where.status = status.toUpperCase();
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        leads,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("[QUOTE_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}