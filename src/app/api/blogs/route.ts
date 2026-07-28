// app/api/blogs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageName = searchParams.get('pageName');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (pageName && pageName !== 'all') {
      where.pageName = pageName;
    }

    if (status === 'published') {
      where.isPublished = true;
    } else if (status === 'draft') {
      where.isPublished = false;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const existing = await prisma.blog.findUnique({
      where: { slug: body.slug },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 409 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt || null,
        content: body.content,
        featuredImg: body.featuredImg || null,
        pageName: body.pageName,
        tags: body.tags || null,
        isPublished: body.isPublished || false,
      },
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}