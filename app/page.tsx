import { ArrowRight, Github, Linkedin, Mail, Eye } from "lucide-react"
import Link from "next/link"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import ContactForm from "@/components/contact-form"
import TypingAnimation from "@/components/typing-animation"
import PixelAvatar from "@/components/pixel-avatar"
import ExperienceCard from "@/components/experience-card"

export default function Home() {
  return (
    <main className="min-h-screen pb-8">
      {/* Hero Section */}
      <section className="bg-card py-16 md:py-24 border-b-4 border-primary">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 border-4 border-primary p-4 bg-background retro-shadow">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight text-foreground">
                <TypingAnimation
                  text="M AL FATIH MUZAKKI"
                  typingSpeed={200}
                  deletingSpeed={75}
                  delayAfterTyping={1500}
                  delayAfterDeleting={500}
                  glitchProbability={0.05}
                  glitchDuration={150}
                />
              </h1>
            </div>
            <p className="text-sm md:text-base text-foreground max-w-[700px] mb-8 leading-relaxed">
              Fullstack Web Developer specializing in Next.js, Golang, Laravel, Express.js
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#projects" className="retro-button text-xs">
                View Projects <ArrowRight className="ml-2 h-3 w-3 inline" />
              </Link>
              <a
                href="https://drive.google.com/file/d/1o3hIe209uRKXvm_gAch7ll91TpV9ieiP/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button text-xs bg-accent text-accent-foreground border-accent-foreground"
              >
                View CV <ArrowRight className="ml-2 h-3 w-3 inline" />
              </a>
              <Link
                href="#contact"
                className="retro-button text-xs bg-secondary text-secondary-foreground border-secondary-foreground"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-12 text-primary">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="aspect-square relative overflow-hidden border-4 border-primary retro-shadow">
                <PixelAvatar />
              </div>
            </div>
            <div className="retro-container">
              <h3 className="text-base font-bold mb-4 text-primary">Hi, I'm M Al Fatih Muzakki</h3>
              <p className="text-foreground text-xs mb-6 leading-relaxed">
                I'm a fullstack developer with over a year of experience, crafting scalable full-stack apps using
                cutting-edge frontend and backend tech for seamless, robust solutions.
              </p>
              <h4 className="text-sm font-bold mb-3 text-primary">My Skills</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                <SkillBadge name="Next.js" />
                <SkillBadge name="React" />
                <SkillBadge name="Golang" />
                <SkillBadge name="Laravel" />
                <SkillBadge name="Express js" />
                <SkillBadge name="PHP" />
                <SkillBadge name="TypeScript" />
                <SkillBadge name="JavaScript" />
                <SkillBadge name="MySQL" />
                <SkillBadge name="PostgreSQL" />
                <SkillBadge name="RESTful APIs" />
              </div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/malfazakki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://id.linkedin.com/in/muhammad-al-fatih-muzakki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:malfazakki@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 border-y-4 border-primary">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-12 text-primary">Experience</h2>
          <div className="max-w-3xl mx-auto">
          <ExperienceCard
              title="Fullstack Web Developer & Mentor"
              company="Pondok IT Indonesia"
              employmentType="Freelance"
              startDate="Aug 2025"
              endDate="Present"
              duration="Ongoing..."
              location="Bantul Regency, Yogyakarta, Indonesia"
              locationType="On-site"
              description="Mentor and Fullstack Web Developer at Programmer Division Pondok IT Indonesia"
              skills={["Next.js", "React", "TypeScript", "Express.js", "Tailwind CSS"]}
            />

            <ExperienceCard
              title="Frontend Developer"
              company="PT Nizom Berkah Informasi"
              employmentType="Full-time"
              startDate="Oct 2023"
              endDate="Dec 2024"
              duration="1 yr 3 mos"
              location="West Jakarta, Jakarta, Indonesia"
              locationType="On-site"
              description="Research and Development Division PT Nizom Berkah Informasi"
              skills={["TypeScript", "Next.js", "React", "Tailwind CSS"]}
            />

            <ExperienceCard
              title="Production Operator"
              company="PT Yamaha Music Manufacturing Asia"
              employmentType="Contract"
              startDate="Sep 2020"
              endDate="Mar 2023"
              duration="2 yrs 7 mos"
              location="Bekasi Regency, West Java, Indonesia"
              locationType="On-site"
              description="Cabinet Assembly Operator YDP-S Piano Series"
              skills={["Assembly", "Production", "Quality Control"]}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-12 text-primary">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="Sistem Informasi Santri Pondok IT"
              description="A full-stack application to integrate student data to one place."
              image="https://res.cloudinary.com/dbsycrmlv/image/upload/c_scale,w_1920/v1745456948/Screenshot_2025-04-24_at_08.06.02_vuhmsz.png"
              tags={["Laravel", "PostgreSQL"]}
              demoUrl="https://sisantri-pit.vercel.app/"
              repoUrl="https://github.com/malfazakki/sisantri-pit"
            />
            <ProjectCard
              title="React Quiz"
              description="A Quiz app built based on React JS."
              image="https://res.cloudinary.com/dbsycrmlv/image/upload/v1745457397/Screenshot_2025-04-23_at_21.23.18_yon4wx.png"
              tags={["React js"]}
              demoUrl="https://the-react-quiz-malfa.vercel.app/"
              repoUrl="https://github.com/malfazakki/the-react-quiz"
            />
            <ProjectCard
              title="Nizom.id Profile Landing Page"
              description="Company Profile Landing Page Nizom System"
              image="https://res.cloudinary.com/dbsycrmlv/image/upload/v1745458173/Screenshot_2025-04-24_at_08.27.19_gto1gf.png"
              tags={["Next js"]}
              demoUrl="https://nizom.id/"
              repoUrl="#"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 border-t-4 border-primary">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-12 text-primary">Get In Touch</h2>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t-4 border-primary">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-primary">
              © {new Date().getFullYear()} M Al Fatih Muzakki. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://github.com/malfazakki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://id.linkedin.com/in/muhammad-al-fatih-muzakki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="mailto:malfazakki@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
