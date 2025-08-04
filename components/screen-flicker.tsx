"use client"

import { useState, useEffect } from "react"

interface ScreenFlickerProps {
  minInterval?: number
  maxInterval?: number
}

export default function ScreenFlicker({ minInterval = 5000, maxInterval = 15000 }: ScreenFlickerProps) {
  const [isFlickering, setIsFlickering] = useState(false)
  const [flickerType, setFlickerType] = useState<"brightness" | "scanlines" | "glitch" | "off">("off")

  useEffect(() => {
    // Function to trigger a random flicker effect
    const triggerFlicker = () => {
      // Don't trigger a new flicker if one is already active
      if (isFlickering) return

      // Randomly decide which type of flicker to use
      const flickerTypes: ("brightness" | "scanlines" | "glitch")[] = ["brightness", "scanlines", "glitch"]
      const randomType = flickerTypes[Math.floor(Math.random() * flickerTypes.length)]

      setFlickerType(randomType)
      setIsFlickering(true)

      // Duration of the flicker effect
      const flickerDuration = Math.random() * 300 + 100 // 100-400ms

      // Reset after the flicker duration
      setTimeout(() => {
        setIsFlickering(false)
        setFlickerType("off")
      }, flickerDuration)
    }

    // Schedule the next flicker
    const scheduleNextFlicker = () => {
      const nextFlickerTime = Math.random() * (maxInterval - minInterval) + minInterval
      return setTimeout(() => {
        triggerFlicker()
        timeoutId = scheduleNextFlicker()
      }, nextFlickerTime)
    }

    // Start the flicker scheduling
    let timeoutId = scheduleNextFlicker()

    // Clean up on unmount
    return () => clearTimeout(timeoutId)
  }, [isFlickering, minInterval, maxInterval])

  if (!isFlickering) return null

  return <div className={`screen-flicker screen-flicker-${flickerType}`} />
}
