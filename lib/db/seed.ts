import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import { projects, experiences } from "./schema";

async function seed() {
  console.log("🌱 Cleaning existing records and seeding updated CV data...");

  // Clear existing
  await db.delete(experiences);
  await db.delete(projects);

  // Seed Experiences from cv-id.html
  await db.insert(experiences).values([
    {
      title: "Freelance Fullstack Web Developer",
      company: "Self-Employed (Mandiri)",
      employmentType: "Freelance",
      startDate: "Jul 2025",
      endDate: "Present",
      duration: "Ongoing...",
      location: "Indonesia",
      locationType: "Remote",
      description:
        "Architecting and building multi-tenant fullstack web applications, SaaS ERP, CRM, and EdTech platforms using React.js, Next.js, NestJS, and Go. Implementing Redis-based single-device login, OCPP 1.6J WebSocket backend for EV chargers, Midtrans payment gateway, and BullMQ queues.",
      skills: JSON.stringify([
        "React.js",
        "Next.js",
        "NestJS",
        "Go",
        "PostgreSQL",
        "Redis",
        "WebSockets",
        "BullMQ",
        "Midtrans",
      ]),
      orderIndex: 0,
    },
    {
      title: "Frontend Web Developer",
      company: "PT Nizom Berkah Informasi",
      employmentType: "Full-time",
      startDate: "Oct 2023",
      endDate: "Dec 2024",
      duration: "1 yr 3 mos",
      location: "West Jakarta, Indonesia",
      locationType: "On-site",
      description:
        "Built and maintained responsive web applications and management dashboards from Figma designs using Next.js, TypeScript, Tailwind CSS, and Bootstrap. Integrated complex UI with REST APIs and refactored legacy code to optimize Core Web Vitals.",
      skills: JSON.stringify([
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React.js",
        "Bootstrap",
        "RESTful APIs",
      ]),
      orderIndex: 1,
    },
    {
      title: "Fullstack Developer Bootcamp",
      company: "Dumbways Indonesia",
      employmentType: "Apprenticeship",
      startDate: "May 2023",
      endDate: "Jul 2023",
      duration: "3 mos",
      location: "South Tangerang, Indonesia",
      locationType: "On-site",
      description:
        "Intensive software engineering program focused on modern fullstack development using React.js, Express.js, Go (Golang), and relational database schema design.",
      skills: JSON.stringify([
        "Go",
        "React.js",
        "Express.js",
        "PostgreSQL",
        "MySQL",
      ]),
      orderIndex: 2,
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
      description:
        "Cabinet Assembly Operator for YDP-S Piano Series, performing precision assembly, hardware installation, and stringent quality control.",
      skills: JSON.stringify(["Assembly", "Production", "Quality Control"]),
      orderIndex: 3,
    },
  ]);

  // Seed Projects from cv-id.html + original projects
  // Projects without uploaded screenshots have image: "" (renders retro placeholder)
  await db.insert(projects).values([
    {
      title: "Manajerku — SaaS ERP, Akuntansi & POS",
      slug: "manajerku-saas-erp-pos",
      description:
        "Enterprise ERP, Accounting & POS SaaS platform with multi-column financial reporting (PDF Balance Sheet & P&L export), bank reconciliation, cashier point-of-sale, and Redis single-device session enforcement with OTP takeover.",
      image: "",
      tags: JSON.stringify([
        "React.js",
        "NestJS",
        "PostgreSQL",
        "Redis",
        "Prisma",
        "Turborepo",
        "Shadcn UI",
      ]),
      demoUrl: "https://manajerku.com",
      repoUrl: "#",
      featured: true,
      orderIndex: 0,
    },
    {
      title: "Horizon Internal System (SAP-HIS)",
      slug: "horizon-internal-system-sap-his",
      description:
        "Maritime logistics operation management system aligned with SAP Business One migration, featuring multi-tier approval workflows, dynamic Sales & Purchase orders, and automated PDF invoice generation.",
      image: "",
      tags: JSON.stringify([
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Go",
        "PostgreSQL",
        "PDF-Lib",
      ]),
      demoUrl: "#",
      repoUrl: "#",
      featured: true,
      orderIndex: 1,
    },
    {
      title: "EV Charger Management & Central OCPP 1.6J Server",
      slug: "ev-charger-ocpp-management",
      description:
        "Centralized OCPP 1.6J WebSocket server and REST API built in Go for 7kW AC EV charging stations. Features real-time telemetry processing (kWh, active power, voltage) and remote session dispatch.",
      image: "",
      tags: JSON.stringify(["Go", "WebSockets", "OCPP 1.6J", "React.js", "Docker", "Python"]),
      demoUrl: "#",
      repoUrl: "#",
      featured: true,
      orderIndex: 2,
    },
    {
      title: "Omnichannel CRM Orbit — AI-Powered WhatsApp CRM",
      slug: "omnichannel-crm-orbit",
      description:
        "WhatsApp omnichannel CRM system featuring an interactive Kanban deal pipeline board, AI-assisted automated reply drafting, and BullMQ & Redis asynchronous high-throughput message processing.",
      image: "",
      tags: JSON.stringify([
        "NestJS",
        "BullMQ",
        "Redis",
        "React.js",
        "Dnd-kit",
        "Tailwind CSS",
      ]),
      demoUrl: "#",
      repoUrl: "#",
      featured: true,
      orderIndex: 3,
    },
    {
      title: "OrbitPay — Tuition & Billing Management",
      slug: "orbitpay-billing-management",
      description:
        "Multi-tenant educational institution tuition and fee billing web application with granular Role-Based Access Control (RBAC), invoice lifecycle tracking, student NIS lookup, and receipt generation.",
      image: "",
      tags: JSON.stringify([
        "NestJS",
        "React.js",
        "TanStack Router",
        "PostgreSQL",
        "Tailwind CSS",
      ]),
      demoUrl: "#",
      repoUrl: "#",
      featured: true,
      orderIndex: 4,
    },
    {
      title: "Impruve — Online Course & EdTech Platform",
      slug: "impruve-edtech-platform",
      description:
        "Online learning platform backend engineered with Go Clean Architecture, handling course catalog, student batch registration, and automated Midtrans SNAP payment webhook verification.",
      image: "",
      tags: JSON.stringify(["Go", "Echo", "GORM", "PostgreSQL", "Next.js", "Midtrans"]),
      demoUrl: "#",
      repoUrl: "#",
      featured: true,
      orderIndex: 5,
    },
    {
      title: "Sistem Informasi Santri Pondok IT",
      slug: "sistem-informasi-santri-pondok-it",
      description: "A full-stack application to integrate student data to one place.",
      image:
        "https://res.cloudinary.com/dbsycrmlv/image/upload/c_scale,w_1920/v1745456948/Screenshot_2025-04-24_at_08.06.02_vuhmsz.png",
      tags: JSON.stringify(["Laravel", "PostgreSQL"]),
      demoUrl: "https://sisantri-pit.vercel.app/",
      repoUrl: "https://github.com/malfazakki/sisantri-pit",
      featured: true,
      orderIndex: 6,
    },
    {
      title: "React Quiz",
      slug: "react-quiz",
      description: "An interactive Quiz application built with React JS and modern state handling.",
      image:
        "https://res.cloudinary.com/dbsycrmlv/image/upload/v1745457397/Screenshot_2025-04-23_at_21.23.18_yon4wx.png",
      tags: JSON.stringify(["React js"]),
      demoUrl: "https://the-react-quiz-malfa.vercel.app/",
      repoUrl: "https://github.com/malfazakki/the-react-quiz",
      featured: true,
      orderIndex: 7,
    },
    {
      title: "Nizom.id Profile Landing Page",
      slug: "nizom-id-profile-landing-page",
      description: "Company Profile Landing Page for Nizom System with responsive UI and modern animations.",
      image:
        "https://res.cloudinary.com/dbsycrmlv/image/upload/v1745458173/Screenshot_2025-04-24_at_08.27.19_gto1gf.png",
      tags: JSON.stringify(["Next js", "Tailwind CSS"]),
      demoUrl: "https://nizom.id/",
      repoUrl: "#",
      featured: true,
      orderIndex: 8,
    },
  ]);

  console.log("✅ Seed completed: Projects without screenshots now have null image (placeholder fallback active)!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
