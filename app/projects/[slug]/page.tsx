import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { parseProjectImages } from "@/lib/project-utils";
import ProjectSlideshow from "@/components/project-slideshow";
import { ArrowLeft, ExternalLink, Github, Calendar, Layers } from "lucide-react";

export const revalidate = 60;

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  let project: (typeof projects.$inferSelect) | undefined;
  try {
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    project = result[0];
  } catch (error) {
    console.error("Failed to query project detail:", error);
  }

  if (!project) {
    notFound();
  }

  const images = parseProjectImages(project.image);

  let tagsList: string[] = [];
  try {
    tagsList = JSON.parse(project.tags);
  } catch {
    tagsList = project.tags.split(",").map((t) => t.trim());
  }

  return (
    <main className="min-h-screen py-10 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/#projects"
            className="retro-button text-xs py-2 px-3 inline-flex items-center gap-2 bg-secondary text-secondary-foreground border-secondary-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Portofolio</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="border-b-4 border-primary pb-6 space-y-4">
          <div className="inline-block border-2 border-primary px-2.5 py-1 text-[11px] font-mono text-primary bg-card">
            [ PROJECT SHOWCASE ]
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-primary tracking-tight">
            {project.title}
          </h1>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button text-xs py-2 px-4 flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Kunjungi Live Demo</span>
              </a>
            )}

            {project.repoUrl && project.repoUrl !== "#" && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button text-xs py-2 px-4 bg-muted text-foreground border-foreground flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Lihat Repository</span>
              </a>
            )}
          </div>
        </header>

        {/* Multiple Image Slideshow */}
        <section>
          <ProjectSlideshow images={images} title={project.title} />
        </section>

        {/* Tech Stack Badges */}
        <section className="p-4 border-4 border-primary bg-card retro-shadow space-y-2">
          <h2 className="text-xs font-bold text-primary flex items-center gap-2 font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>TECH STACK & TOOLS</span>
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {tagsList.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono font-bold border-2 border-primary bg-background text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Description & Details */}
        <section className="p-6 border-4 border-primary bg-card retro-shadow space-y-4">
          <h2 className="text-sm font-bold text-primary border-b-2 border-primary/40 pb-2">
            Tentang Proyek
          </h2>
          <p className="text-foreground text-xs md:text-sm leading-relaxed whitespace-pre-line">
            {project.description}
          </p>

          {project.content && (
            <div className="pt-4 border-t border-primary/20 space-y-2">
              <h3 className="text-xs font-bold text-primary font-mono">[ CASE STUDY & DETAILS ]</h3>
              <div className="text-foreground text-xs leading-relaxed whitespace-pre-line">
                {project.content}
              </div>
            </div>
          )}
        </section>

        {/* Footer Navigation */}
        <div className="pt-6 border-t-4 border-primary flex justify-between items-center text-xs">
          <Link
            href="/#projects"
            className="text-primary hover:underline font-mono"
          >
            ← Kembali ke Semua Proyek
          </Link>
          <Link
            href="/#contact"
            className="retro-button text-xs py-1.5 px-3"
          >
            Hubungi Saya
          </Link>
        </div>
      </div>
    </main>
  );
}

