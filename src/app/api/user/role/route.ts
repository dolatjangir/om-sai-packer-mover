import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../../lib/prisma";


export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { role } = body;

    if (!role || !["USER", "DRIVER"].includes(role)) {
      return NextResponse.json(
        { message: "Role must be USER or DRIVER" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        role: role,
        onboardingCompleted: true,
      },
      select: {
        id: true,
        email: true,
        role: true,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json(
      {
        message: "Role updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Role update error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}