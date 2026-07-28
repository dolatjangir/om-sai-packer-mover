// lib/blogs.ts
import { prisma } from './prisma';

export async function getPageBlogs(pageName: string, limit: number = 3) {
  return prisma.blog.findMany({
    where: {
      pageName,
      isPublished: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}