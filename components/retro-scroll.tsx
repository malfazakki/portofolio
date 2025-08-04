"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface RetroScrollProps {
  children: React.ReactNode
}

export default function RetroScroll({ children }: RetroScrollProps) {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollEffect, setScrollEffect] = useState<"scanlines" | "static" | "flicker" | null>(null)

  // Handle smooth scrolling with retro effects
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only process links that point to ID anchors on the same page
    const href = e.currentTarget.getAttribute("href")
    if (!href?.startsWith("#")) return

    e.preventDefault()

    // Get the target element
    const targetId = href.slice(1)
    const targetElement = document.getElementById(targetId)

    if (!targetElement) return

    // Choose a random effect
    const effects: ("scanlines" | "static" | "flicker")[] = ["scanlines", "static", "flicker"]
    const randomEffect = effects[Math.floor(Math.random() * effects.length)]

    // Start the scroll animation
    setScrollEffect(randomEffect)
    setIsScrolling(true)

    // Play retro sound effect
    const audio = new Audio()
    audio.volume = 0.2

    if (randomEffect === "scanlines") {
      audio.src = "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"
    } else if (randomEffect === "static") {
      audio.src = "https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3"
    } else {
      audio.src = "https://assets.mixkit.co/active_storage/sfx/2/2-preview.mp3"
    }

    audio.play().catch(() => {
      // Ignore errors - browsers may block autoplay
    })

    // Scroll to the target element
    setTimeout(() => {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // End the animation after scrolling completes
      setTimeout(() => {
        setIsScrolling(false)
        setScrollEffect(null)
      }, 800)
    }, 300)
  }

  // Add click handler to all anchor links that point to IDs
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", handleClick as unknown as EventListener)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick as unknown as EventListener)
      })
    }
  }, [])

  return (
    <>
      {children}
      {isScrolling && (
        <div className={`retro-scroll-effect retro-scroll-${scrollEffect}`}>
          {scrollEffect === "static" && <div className="retro-scroll-static"></div>}
        </div>
      )}
    </>
  )
}
