import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScreenFlicker from "@/components/screen-flicker"
import CrtPowerOn from "@/components/crt-power-on"
import RetroScroll from "@/components/retro-scroll"
import { Press_Start_2P } from "next/font/google"

// Use Press Start 2P font from Google Fonts
const pixelFont = Press_Start_2P({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "M Al Fatih Muzakki | Software Engineer",
  description:
    "Retro-styled portfolio showcasing my work as a software engineer specializing in Next.js, Golang, Laravel, Express JS.",
    generator: 'v0.dev'
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
