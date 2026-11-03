import { ArrowRight, Github, Linkedin, Mail, Shield } from "lucide-react";
import Link from "next/link";
import SkillBadge from "@/components/skill-badge";
import ContactForm from "@/components/contact-form";
import TypingAnimation from "@/components/typing-animation";
import PixelAvatar from "@/components/pixel-avatar";
import ExperienceCard from "@/components/experience-card";
import ProjectsView from "@/components/projects-view";
import { db } from "@/lib/db";
import { projects, experiences } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

// Enable revalidation for static + dynamic speed (ISR)
export const revalidate = 60;

export default async function Home() {
  let allExperiences: (typeof experiences.$inferSelect)[] = [];
  let allProjects: (typeof projects.$inferSelect)[] = [];

  try {
    allExperiences = await db
      .select()
      .from(experiences)
      .orderBy(asc(experiences.orderIndex));

    allProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(asc(projects.orderIndex));
  } catch (error) {
    console.error(
      "Warning: Failed to fetch from database during render:",
      error,
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "M Al Fatih Muzakki",
    url: "https://malfazakki.vercel.app",
    jobTitle: "Fullstack Web Developer",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Dumbways Indonesia",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Go (Golang)",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "Tailwind CSS",
    ],
    sameAs: [
      "https://github.com/malfazakki",
      "https://id.linkedin.com/in/muhammad-al-fatih-muzakki",
    ],
  };

  return (
    <main className="min-h-screen pb-8">
      {/* Schema.org JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              Fullstack Web Developer specializing in Next.js, Go (Echo),
              NestJS, React, TypeScript & PostgreSQL
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#projects" className="retro-button text-xs">
                View Projects <ArrowRight className="ml-2 h-3 w-3 inline" />
              </Link>
              <a
                href="https://drive.google.com/file/d/1CTYfV0stuuXR4GTXEGP0qNbKbYwCfxU5/view?usp=sharing"
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
          <h2 className="text-xl md:text-2xl font-bold text-center mb-12 text-primary">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="aspect-square relative overflow-hidden border-4 border-primary retro-shadow">
                <PixelAvatar />
              </div>
            </div>
            <div className="retro-container">
              <h3 className="text-base font-bold mb-4 text-primary">
                Hi, I'm M Al Fatih Muzakki
              </h3>
              <p className="text-foreground text-xs mb-6 leading-relaxed">
                Fullstack Web Developer with proven hands-on experience in
                designing and building SaaS platforms, ERP, CRM, and
                IoT/telemetry management systems. Proficient in{" "}
                <strong>React.js, Next.js (App Router), TypeScript</strong>, and{" "}
                <strong>Tailwind CSS/Shadcn UI</strong> on the frontend,
                supported by strong backend expertise in{" "}
                <strong>NestJS, Go (Echo), Express.js</strong>, and{" "}
                <strong>PostgreSQL/Redis</strong>. Experienced in real-time
                WebSockets (OCPP 1.6J protocol for EV charging stations),
                background job queues (BullMQ), single-device active session
                enforcement with OTP takeover, and payment gateway integrations
                (Midtrans SNAP). Dedicated to clean architecture and performant
                user experiences.
              </p>
              <h4 className="text-sm font-bold mb-3 text-primary">My Skills</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                <SkillBadge name="Next.js" />
                <SkillBadge name="React.js" />
                <SkillBadge name="TypeScript" />
                <SkillBadge name="Go (Golang)" />
                <SkillBadge name="NestJS" />
                <SkillBadge name="Express.js" />
                <SkillBadge name="PostgreSQL" />
                <SkillBadge name="Redis" />
                <SkillBadge name="Tailwind CSS" />
                <SkillBadge name="WebSockets (OCPP 1.6J)" />
                <SkillBadge name="BullMQ" />
                <SkillBadge name="Docker" />
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
                <a
                  href="mailto:malfazakki@gmail.com"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section (Dynamic from Turso SQLite) */}
      <section id="experience" className="py-16 border-y-4 border-primary">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-12 text-primary">
            Experience
          </h2>
          <div className="max-w-3xl mx-auto">
            {allExperiences.map((exp) => {
              let skillsList: string[] = [];
              try {
                skillsList = JSON.parse(exp.skills);
              } catch {
                skillsList = exp.skills.split(",").map((s) => s.trim());
              }

              return (
                <ExperienceCard
                  key={exp.id}
                  title={exp.title}
                  company={exp.company}
                  employmentType={exp.employmentType}
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  duration={exp.duration}
                  location={exp.location}
                  locationType={exp.locationType}
                  description={exp.description}
                  skills={skillsList}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section (Dynamic from Turso SQLite + Search & Tags Filter) */}
      <section id="projects" className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-12 text-primary">
            My Projects
          </h2>
          <ProjectsView initialProjects={allProjects} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 border-t-4 border-primary">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-12 text-primary">
            Get In Touch
          </h2>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t-4 border-primary">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary">
              © {new Date().getFullYear()} M Al Fatih Muzakki. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                title="Admin Portal"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Admin</span>
              </Link>
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
              <a
                href="mailto:malfazakki@gmail.com"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
