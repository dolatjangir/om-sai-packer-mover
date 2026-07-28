

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';


export async function GET(
  req: NextRequest,
 { params }: { params: Promise<{ pageName: string }> }
) {
  try {
      const { pageName } = await params;
    const blogs = await prisma.blog.findMany({
      where: {
        pageName: pageName,
        isPublished: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}