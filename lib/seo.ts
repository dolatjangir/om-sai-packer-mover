import { prisma } from "./prisma";


export async function getSEO(slug: string) {

   try {
   const entry = await prisma.seoEntry.findFirst({
      where: {
        slug,
        status: "published", // ← Only fetch published
      },
      orderBy: { lastModified: "desc" }, // Get most recent if multiple
    });

    if (!entry) return null; // Draft or missing → triggers your fallback

    return {
      ...entry,
      keywords: JSON.parse(entry.keywords || "[]"),
    };
  } catch (error) {
    console.error("DB Error:", error);
    return null; // 👈 prevent crash
  }
}