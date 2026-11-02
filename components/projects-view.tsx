"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/lib/db/schema";
import ProjectCard from "@/components/project-card";
import { Search } from "lucide-react";

interface ProjectsViewProps {
  initialProjects: Project[];
}

export default function ProjectsView({ initialProjects }: ProjectsViewProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique tags across all projects
  const allTags = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      try {
        const parsed = JSON.parse(p.tags);
        if (Array.isArray(parsed)) {
          parsed.forEach((t) => set.add(t.trim()));
        }
      } catch {
        p.tags.split(",").forEach((t) => set.add(t.trim()));
      }
    });
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  // Filter projects by tag and search query
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      let tagsList: string[] = [];
      try {
        tagsList = JSON.parse(p.tags);
      } catch {
        tagsList = p.tags.split(",").map((t) => t.trim());
      }

      const matchesTag =
        selectedTag === "All" ||
        tagsList.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      const matchesQuery =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tagsList.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTag && matchesQuery;
    });
  }, [initialProjects, selectedTag, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tag Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          {allTags.map((tag) => {
            const isActive = selectedTag.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`retro-button text-[11px] py-1 px-3 transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold shadow-md"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari proyek..."
            className="w-full pl-8 pr-3 py-1.5 bg-background border-2 border-primary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Grid Projects */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-primary/40 p-6 bg-card">
          <p className="text-xs text-muted-foreground font-mono">
            [!] Tidak ada proyek yang cocok dengan filter atau kata kunci tersebut.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => {
            let tagsList: string[] = [];
            try {
              tagsList = JSON.parse(p.tags);
            } catch {
              tagsList = p.tags.split(",").map((t) => t.trim());
            }

            return (
              <ProjectCard
                key={p.id}
                slug={p.slug}
                title={p.title}
                description={p.description}
                image={p.image}
                tags={tagsList}
                demoUrl={p.demoUrl || "#"}
                repoUrl={p.repoUrl || "#"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

