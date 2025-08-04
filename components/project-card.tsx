import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
}

export default function ProjectCard({ title, description, image, tags, demoUrl, repoUrl }: ProjectCardProps) {
  return (
    <div className="retro-card overflow-hidden group">
      <div className="aspect-video relative overflow-hidden border-b-4 border-primary">
        <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full pixelated" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-primary">{title}</h3>
        <p className="text-foreground text-xs mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center border border-primary px-1.5 py-0.5 text-[10px] font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium text-secondary hover:text-secondary/80"
          >
            <ExternalLink className="h-3 w-3 mr-1" /> Demo
          </a>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium text-secondary hover:text-secondary/80"
          >
            <Github className="h-3 w-3 mr-1" /> Code
          </a>
        </div>
      </div>
    </div>
  )
}
