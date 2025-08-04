import { Calendar, MapPin, Briefcase } from "lucide-react"

interface ExperienceCardProps {
  title: string
  company: string
  employmentType: string
  startDate: string
  endDate: string
  duration: string
  location: string
  locationType: string
  description: string
  skills?: string[]
}

export default function ExperienceCard({
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
}: ExperienceCardProps) {
  return (
    <div className="retro-container mb-6">
      <div className="flex flex-col md:flex-row justify-between mb-2">
        <h3 className="text-base font-bold text-primary">{title}</h3>
        <div className="text-xs text-primary-foreground bg-primary px-2 py-1 self-start mt-1 md:mt-0">
          {employmentType}
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-center gap-1 mb-1">
          <Briefcase className="h-3 w-3 text-primary" />
          <span className="text-xs">{company}</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <Calendar className="h-3 w-3 text-primary" />
          <span className="text-xs">
            {startDate} - {endDate} · {duration}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-primary" />
          <span className="text-xs">
            {location} · {locationType}
          </span>
        </div>
      </div>

      <p className="text-xs mb-3 leading-relaxed">{description}</p>

      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center border border-primary px-1.5 py-0.5 text-[10px] font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
