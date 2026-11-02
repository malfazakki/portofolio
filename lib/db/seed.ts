import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import { projects, experiences } from "./schema";

async function seed() {
  console.log("🌱 Seeding initial data...");

  // Seed Experiences
  await db.insert(experiences).values([
    {
      title: "Fullstack Web Developer & Mentor",
      company: "Pondok IT Indonesia",
      employmentType: "Freelance",
      startDate: "Aug 2025",
      endDate: "Present",
      duration: "Ongoing...",
      location: "Bantul Regency, Yogyakarta, Indonesia",
      locationType: "On-site",
      description: "Mentor and Fullstack Web Developer at Programmer Division Pondok IT Indonesia",
      skills: JSON.stringify(["Next.js", "React", "TypeScript", "Express.js", "Tailwind CSS"]),
      orderIndex: 0,
    },
    {
      title: "Frontend Developer",
      company: "PT Nizom Berkah Informasi",
      employmentType: "Full-time",
      startDate: "Oct 2023",
      endDate: "Dec 2024",
      duration: "1 yr 3 mos",
      location: "West Jakarta, Jakarta, Indonesia",
      locationType: "On-site",
      description: "Research and Development Division PT Nizom Berkah Informasi",
      skills: JSON.stringify(["TypeScript", "Next.js", "React", "Tailwind CSS"]),
      orderIndex: 1,
    },
    {
      title: "Production Operator",
      company: "PT Yamaha Music Manufacturing Asia",
      employmentType: "Contract",
      startDate: "Sep 2020",
      endDate: "Mar 2023",
      duration: "2 yrs 7 mos",
      location: "Bekasi Regency, West Java, Indonesia",
      locationType: "On-site",
      description: "Cabinet Assembly Operator YDP-S Piano Series",
      skills: JSON.stringify(["Assembly", "Production", "Quality Control"]),
      orderIndex: 2,
    },
  ]);

  // Seed Projects
  await db.insert(projects).values([
    {
      title: "Sistem Informasi Santri Pondok IT",
      slug: "sistem-informasi-santri-pondok-it",
      description: "A full-stack application to integrate student data to one place.",
      image: "https://res.cloudinary.com/dbsycrmlv/image/upload/c_scale,w_1920/v1745456948/Screenshot_2025-04-24_at_08.06.02_vuhmsz.png",
      tags: JSON.stringify(["Laravel", "PostgreSQL"]),
      demoUrl: "https://sisantri-pit.vercel.app/",
      repoUrl: "https://github.com/malfazakki/sisantri-pit",
      featured: true,
      orderIndex: 0,
    },
    {
      title: "React Quiz",
      slug: "react-quiz",
      description: "A Quiz app built based on React JS.",
      image: "https://res.cloudinary.com/dbsycrmlv/image/upload/v1745457397/Screenshot_2025-04-23_at_21.23.18_yon4wx.png",
      tags: JSON.stringify(["React js"]),
      demoUrl: "https://the-react-quiz-malfa.vercel.app/",
      repoUrl: "https://github.com/malfazakki/the-react-quiz",
      featured: true,
      orderIndex: 1,
    },
    {
      title: "Nizom.id Profile Landing Page",
      slug: "nizom-id-profile-landing-page",
      description: "Company Profile Landing Page Nizom System",
      image: "https://res.cloudinary.com/dbsycrmlv/image/upload/v1745458173/Screenshot_2025-04-24_at_08.27.19_gto1gf.png",
      tags: JSON.stringify(["Next js"]),
      demoUrl: "https://nizom.id/",
      repoUrl: "#",
      featured: true,
      orderIndex: 2,
    },
  ]);

  console.log("✅ Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

