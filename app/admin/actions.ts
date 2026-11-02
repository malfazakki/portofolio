"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { projects, experiences } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSession, destroySession, verifyAdminPassword, getSession } from "@/lib/auth";

// --- Auth Actions ---
export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;

  if (!password || !verifyAdminPassword(password)) {
    return { error: "Password admin salah!" };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

// Helper to ensure authenticated in server action
async function assertAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
}

// --- Project Actions ---
export async function createProjectAction(formData: FormData) {
  await assertAuth();

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/\s+/g, "-");
  const description = (formData.get("description") as string)?.trim();
  const content = (formData.get("content") as string)?.trim() || null;
  const image = (formData.get("image") as string)?.trim();
  const tagsRaw = (formData.get("tags") as string) || "";
  const demoUrl = (formData.get("demoUrl") as string)?.trim() || null;
  const repoUrl = (formData.get("repoUrl") as string)?.trim() || null;
  const featured = formData.get("featured") === "on";
  const orderIndex = parseInt((formData.get("orderIndex") as string) || "0", 10);

  const tags = JSON.stringify(
    tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  );

  await db.insert(projects).values({
    title,
    slug,
    description,
    content,
    image,
    tags,
    demoUrl,
    repoUrl,
    featured,
    orderIndex,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateProjectAction(id: number, formData: FormData) {
  await assertAuth();

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/\s+/g, "-");
  const description = (formData.get("description") as string)?.trim();
  const content = (formData.get("content") as string)?.trim() || null;
  const image = (formData.get("image") as string)?.trim();
  const tagsRaw = (formData.get("tags") as string) || "";
  const demoUrl = (formData.get("demoUrl") as string)?.trim() || null;
  const repoUrl = (formData.get("repoUrl") as string)?.trim() || null;
  const featured = formData.get("featured") === "on";
  const orderIndex = parseInt((formData.get("orderIndex") as string) || "0", 10);

  const tags = JSON.stringify(
    tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  );

  await db
    .update(projects)
    .set({
      title,
      slug,
      description,
      content,
      image,
      tags,
      demoUrl,
      repoUrl,
      featured,
      orderIndex,
    })
    .where(eq(projects.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProjectAction(id: number) {
  await assertAuth();

  await db.delete(projects).where(eq(projects.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// --- Experience Actions ---
export async function createExperienceAction(formData: FormData) {
  await assertAuth();

  const title = (formData.get("title") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const employmentType = (formData.get("employmentType") as string) || "Full-time";
  const startDate = (formData.get("startDate") as string)?.trim();
  const endDate = (formData.get("endDate") as string)?.trim() || "Present";
  const duration = (formData.get("duration") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const locationType = (formData.get("locationType") as string) || "On-site";
  const description = (formData.get("description") as string)?.trim();
  const skillsRaw = (formData.get("skills") as string) || "";
  const orderIndex = parseInt((formData.get("orderIndex") as string) || "0", 10);

  const skills = JSON.stringify(
    skillsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

  await db.insert(experiences).values({
    title,
    company,
    employmentType,
    startDate,
    endDate,
    duration,
    location,
    locationType,
    description,
    skills,
    orderIndex,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateExperienceAction(id: number, formData: FormData) {
  await assertAuth();

  const title = (formData.get("title") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const employmentType = (formData.get("employmentType") as string) || "Full-time";
  const startDate = (formData.get("startDate") as string)?.trim();
  const endDate = (formData.get("endDate") as string)?.trim() || "Present";
  const duration = (formData.get("duration") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const locationType = (formData.get("locationType") as string) || "On-site";
  const description = (formData.get("description") as string)?.trim();
  const skillsRaw = (formData.get("skills") as string) || "";
  const orderIndex = parseInt((formData.get("orderIndex") as string) || "0", 10);

  const skills = JSON.stringify(
    skillsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

  await db
    .update(experiences)
    .set({
      title,
      company,
      employmentType,
      startDate,
      endDate,
      duration,
      location,
      locationType,
      description,
      skills,
      orderIndex,
    })
    .where(eq(experiences.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteExperienceAction(id: number) {
  await assertAuth();

  await db.delete(experiences).where(eq(experiences.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

