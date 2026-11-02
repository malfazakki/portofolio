import { db } from "@/lib/db";
import { projects, experiences } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import AdminTabs from "@/components/admin/admin-tabs";
import { FolderGit2, Briefcase, Cloud, Database } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.orderIndex));

  const allExperiences = await db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.orderIndex));

  const cloudinaryConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

  return (
    <div className="space-y-8">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border-4 border-primary p-4 bg-card retro-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">TOTAL PROJECTS</span>
            <FolderGit2 className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary font-mono">{allProjects.length}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Live in portfolio</div>
        </div>

        <div className="border-4 border-primary p-4 bg-card retro-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">EXPERIENCES</span>
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary font-mono">{allExperiences.length}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Career positions</div>
        </div>

        <div className="border-4 border-primary p-4 bg-card retro-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">TURSO DB</span>
            <Database className="w-4 h-4 text-primary" />
          </div>
          <div className="text-sm font-bold text-primary font-mono truncate">libSQL Cloud</div>
          <div className="text-[10px] text-primary mt-1">● Online & Synced</div>
        </div>

        <div className="border-4 border-primary p-4 bg-card retro-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">CLOUDINARY API</span>
            <Cloud className="w-4 h-4 text-primary" />
          </div>
          <div className="text-sm font-bold font-mono">
            {cloudinaryConfigured ? (
              <span className="text-primary">● Configured</span>
            ) : (
              <span className="text-destructive">Pending Keys</span>
            )}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            {cloudinaryConfigured ? "Image upload ready" : "Isi keys di .env.local"}
          </div>
        </div>
      </div>

      {/* Main Tabbed Management Interface */}
      <AdminTabs projects={allProjects} experiences={allExperiences} />
    </div>
  );
}
