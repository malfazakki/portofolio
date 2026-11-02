"use client";

import { useState } from "react";
import type { Project, Experience } from "@/lib/db/schema";
import ProjectManager from "@/components/admin/project-manager";
import ExperienceManager from "@/components/admin/experience-manager";
import { FolderGit2, Briefcase } from "lucide-react";

interface AdminTabsProps {
  projects: Project[];
  experiences: Experience[];
}

export default function AdminTabs({ projects, experiences }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "experiences">("projects");

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex border-b-4 border-primary">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 py-3 px-6 text-xs md:text-sm font-bold tracking-wider transition-all border-t-2 border-x-2 ${
            activeTab === "projects"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/40"
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>PROJECTS ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("experiences")}
          className={`flex items-center gap-2 py-3 px-6 text-xs md:text-sm font-bold tracking-wider transition-all border-t-2 border-x-2 ${
            activeTab === "experiences"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/40"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>EXPERIENCES ({experiences.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "projects" ? (
          <ProjectManager initialProjects={projects} />
        ) : (
          <ExperienceManager initialExperiences={experiences} />
        )}
      </div>
    </div>
  );
}

