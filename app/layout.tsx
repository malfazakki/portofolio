import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScreenFlicker from "@/components/screen-flicker"
import CrtPowerOn from "@/components/crt-power-on"
import RetroScroll from "@/components/retro-scroll"
import { Press_Start_2P } from "next/font/google"

const pixelFont = Press_Start_2P({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://malfazakki.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "M Al Fatih Muzakki | Fullstack Web Developer",
    template: "%s | M Al Fatih Muzakki",
  },
  description:
    "Fullstack Web Developer portfolio of M Al Fatih Muzakki specializing in Next.js, Go (Echo), NestJS, React, TypeScript, and PostgreSQL.",
  applicationName: "M Al Fatih Muzakki Portfolio",
  keywords: [
    "M Al Fatih Muzakki",
    "Fullstack Developer",
    "Software Engineer",
    "Next.js Developer Indonesia",
    "Golang Developer",
    "NestJS Developer",
    "React Developer",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "OCPP EV Charger",
    "Web Developer Indonesia",
  ],
  authors: [{ name: "M Al Fatih Muzakki", url: "https://github.com/malfazakki" }],
  creator: "M Al Fatih Muzakki",
  publisher: "M Al Fatih Muzakki",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "M Al Fatih Muzakki Portfolio",
    title: "M Al Fatih Muzakki | Fullstack Web Developer",
    description:
      "Fullstack Web Developer specializing in Next.js, Go (Echo), NestJS, React, TypeScript, and PostgreSQL.",
  },
  twitter: {
    card: "summary_large_image",
    title: "M Al Fatih Muzakki | Fullstack Web Developer",
    description:
      "Fullstack Web Developer specializing in Next.js, Go (Echo), NestJS, React, TypeScript, and PostgreSQL.",
    creator: "@malfazakki",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={pixelFont.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <RetroScroll>{children}</RetroScroll>
          <div className="scanlines"></div>
          <div className="crt-effect"></div>
          <ScreenFlicker minInterval={5000} maxInterval={15000} />
          <CrtPowerOn />
        </ThemeProvider>
      </body>
    </html>
  )
}
