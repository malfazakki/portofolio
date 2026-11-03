import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://malfazakki.vercel.app";

  let projectRoutes: MetadataRoute.Sitemap = [];

  try {
    const allProjects = await db
      .select({
        slug: projects.slug,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .where(eq(projects.featured, true));

    projectRoutes = allProjects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to generate dynamic project sitemap:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
