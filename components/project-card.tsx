"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, ExternalLink, ImageOff, ArrowRight, Images } from "lucide-react"
import { parseProjectImages } from "@/lib/project-utils"

interface ProjectCardProps {
  slug?: string
  title: string
  description: string
  image?: string | null
  tags: string[]
  demoUrl: string
  repoUrl: string
}

export default function ProjectCard({
  slug,
  title,
  description,
  image,
  tags,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  const allImages = parseProjectImages(image)
  const coverImage = allImages.length > 0 ? allImages[0] : null
  const hasValidImage = Boolean(coverImage && !imageError)

  const detailUrl = slug ? `/projects/${slug}` : null

  return (
    <div className="retro-card overflow-hidden group flex flex-col h-full">
      {/* Cover Image or Placeholder */}
      <div className="aspect-video relative overflow-hidden border-b-4 border-primary bg-background">
        {hasValidImage ? (
          detailUrl ? (
            <Link href={detailUrl} className="block w-full h-full">
              <img
                src={coverImage!}
                alt={title}
                onError={() => setImageError(true)}
                className="object-cover w-full h-full pixelated group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          ) : (
            <img
              src={coverImage!}
              alt={title}
              onError={() => setImageError(true)}
              className="object-cover w-full h-full pixelated group-hover:scale-105 transition-transform duration-300"
            />
          )
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

        {/* Multi-image indicator badge */}
        {allImages.length > 1 && (
          <div className="absolute top-2 right-2 bg-background/90 border border-primary px-2 py-0.5 text-[10px] font-mono font-bold text-primary flex items-center gap-1 retro-shadow">
            <Images className="w-3 h-3" />
            <span>{allImages.length} Slides</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold mb-2 text-primary">
          {detailUrl ? (
            <Link href={detailUrl} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

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

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-primary/20 text-xs">
          <div className="flex gap-3">
            {demoUrl && demoUrl !== "#" ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-secondary hover:text-secondary/80 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="h-3 w-3 mr-1" /> Demo
              </a>
            ) : null}

            {repoUrl && repoUrl !== "#" ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-secondary hover:text-secondary/80 transition-colors"
                title="GitHub Repo"
              >
                <Github className="h-3 w-3 mr-1" /> Code
              </a>
            ) : null}
          </div>

          {detailUrl && (
            <Link
              href={detailUrl}
              className="inline-flex items-center text-[11px] font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <span>Detail & Slides</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
