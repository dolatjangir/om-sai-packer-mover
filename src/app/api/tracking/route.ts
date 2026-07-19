import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";


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
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Tracking code is required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findFirst({
      where: {
        trackingCode: code,
        customerId: session.user.id,
      },
      include: {
        trackingUpdates: { orderBy: { timestamp: "desc" } },
        driver: { select: { name: true, phone: true } },
        customer: { select: { name: true, phone: true } },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Tracking code not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { booking },
    });
  } catch (error) {
    console.error("[TRACKING_GET_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tracking details",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}