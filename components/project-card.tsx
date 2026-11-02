"use client"

import { useState } from "react"
import { Github, ExternalLink, ImageOff } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image?: string | null
  tags: string[]
  demoUrl: string
  repoUrl: string
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  const hasValidImage = Boolean(image && image.trim() !== "" && !imageError)

  return (
    <div className="retro-card overflow-hidden group flex flex-col h-full">
      <div className="aspect-video relative overflow-hidden border-b-4 border-primary bg-background">
        {hasValidImage ? (
          <img
            src={image!}
            alt={title}
            onError={() => setImageError(true)}
            className="object-cover w-full h-full pixelated group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-card flex flex-col items-center justify-center p-4 text-center select-none border-2 border-dashed border-primary/30 m-0">
            <div className="w-10 h-10 border-2 border-primary/50 flex items-center justify-center mb-2 bg-background">
              <ImageOff className="w-5 h-5 text-primary/70" />
            </div>
            <span className="text-[11px] font-mono font-bold tracking-wider text-primary">
              [ NO IMAGE ]
            </span>
            <span className="text-[9px] text-muted-foreground font-mono mt-0.5">
              Screenshot not yet uploaded
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold mb-2 text-primary">{title}</h3>
        <p className="text-foreground text-xs mb-4 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center border border-primary/60 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-2 border-t border-primary/20">
          {demoUrl && demoUrl !== "#" ? (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              <ExternalLink className="h-3 w-3 mr-1" /> Demo
            </a>
          ) : (
            <span className="inline-flex items-center text-xs font-medium text-muted-foreground/60 cursor-not-allowed">
              <ExternalLink className="h-3 w-3 mr-1" /> Demo N/A
            </span>
          )}

          {repoUrl && repoUrl !== "#" ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              <Github className="h-3 w-3 mr-1" /> Code
            </a>
          ) : (
            <span className="inline-flex items-center text-xs font-medium text-muted-foreground/60 cursor-not-allowed">
              <Github className="h-3 w-3 mr-1" /> Private Repo
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
