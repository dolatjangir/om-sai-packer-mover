import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { cloudinary } from "../../../../../lib/cloudinary";


export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { publicId } = await req.json();
    if (!publicId) {
      return NextResponse.json({ success: false, message: "publicId required" }, { status: 400 });
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true, message: "Image deleted" });
  } catch (error) {
    console.error("[CLOUDINARY_DELETE]", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}