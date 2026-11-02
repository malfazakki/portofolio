import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content"), // Optional: Detailed markdown / case study
  image: text("image").notNull(),
  tags: text("tags").notNull(), // JSON string: ["Next.js", "Tailwind CSS"]
  demoUrl: text("demo_url"),
  repoUrl: text("repo_url"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(true),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  company: text("company").notNull(),
  employmentType: text("employment_type").notNull().default("Full-time"), // Full-time, Freelance, Contract, Internship
  startDate: text("start_date").notNull(), // e.g. "Aug 2025"
  endDate: text("end_date").notNull().default("Present"), // e.g. "Present" or "Dec 2024"
  duration: text("duration").notNull(), // e.g. "Ongoing...", "1 yr 3 mos"
  location: text("location").notNull(),
  locationType: text("location_type").notNull().default("On-site"), // On-site, Remote, Hybrid
  description: text("description").notNull(),
  skills: text("skills").notNull(), // JSON string: ["Next.js", "TypeScript"]
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;

