"use client"

import { useState, useEffect } from "react"

export default function CrtPowerOn() {
  const [powerOnStage, setPowerOnStage] = useState<"off" | "flicker" | "lines" | "static" | "brighten" | "complete">(
    "off",
  )
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Start the power-on sequence
    const sequence = async () => {
      // Initial black screen
      await new Promise((resolve) => setTimeout(resolve, 500))

      // First flicker
      setPowerOnStage("flicker")
      await new Promise((resolve) => setTimeout(resolve, 700))

      // Scan lines appear
      setPowerOnStage("lines")
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Static noise
      setPowerOnStage("static")
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Brighten up
      setPowerOnStage("brighten")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Complete and fade out the overlay
      setPowerOnStage("complete")
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Hide the power-on animation
      setVisible(false)
    }

    // Run the sequence
    sequence()

    // Save that we've shown the animation in session storage
    // so it doesn't play again on page refresh
    if (typeof window !== "undefined") {
      const hasSeenAnimation = sessionStorage.getItem("crtPowerOnSeen")

      if (!hasSeenAnimation) {
        sessionStorage.setItem("crtPowerOnSeen", "true")
      } else {
        // If they've already seen it this session, skip the animation
        setVisible(false)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`crt-power-on crt-power-on-${powerOnStage}`}>
      {powerOnStage === "static" && <div className="crt-static"></div>}
      {(powerOnStage === "lines" ||
        powerOnStage === "static" ||
        powerOnStage === "brighten" ||
        powerOnStage === "complete") && <div className="crt-scanlines"></div>}
      {powerOnStage === "flicker" && <div className="crt-flicker"></div>}
    </div>
  )
}
