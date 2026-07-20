import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits").optional(),
   image: z.string().url().optional().nullable(),
   imagePublicId: z.string().optional().nullable(), 
  address: z.string().max(500).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  state: z.string().max(100).optional().nullable(),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits").optional().nullable(),
});

// GET - Fetch driver profile
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("[DRIVER_PROFILE_GET]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PATCH - Update driver profile
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validation = updateSchema.safeParse(body);

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

    // Only allow updating own profile
    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.address !== undefined && { address: data.address }),
        ...(data.city !== undefined && { city: data.city }),
        ...(data.state !== undefined && { state: data.state }),
        ...(data.pincode !== undefined && { pincode: data.pincode }),
        ...(data.image !== undefined && { image: data.image }),
         ...(data.imagePublicId !== undefined && { imagePublicId: data.imagePublicId }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: { user: updated },
    });
  } catch (error) {
    console.error("[DRIVER_PROFILE_PATCH]", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}