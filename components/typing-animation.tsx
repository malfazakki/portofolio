"use client"

import { useState, useEffect, useCallback } from "react"

interface TypingAnimationProps {
  text: string
  typingSpeed?: number
  deletingSpeed?: number
  delayAfterTyping?: number
  delayAfterDeleting?: number
  glitchProbability?: number
  glitchDuration?: number
}

// Characters to use for glitch effects
const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>/?`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export default function TypingAnimation({
  text,
  typingSpeed = 150,
  deletingSpeed = 75,
  delayAfterTyping = 1500,
  delayAfterDeleting = 500,
  glitchProbability = 0.03, // 3% chance of glitch per character
  glitchDuration = 150, // Duration of glitch effect in ms
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [phase, setPhase] = useState<"typing" | "pausing-typed" | "deleting" | "pausing-deleted">("typing")
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchText, setGlitchText] = useState("")
  const [glitchClass, setGlitchClass] = useState("")

  // Reset animation when text prop changes
  useEffect(() => {
    setDisplayText("")
    setPhase("typing")
  }, [text])

  // Function to create a glitch effect
  const triggerGlitch = useCallback(() => {
    if (Math.random() < glitchProbability && !isGlitching) {
      setIsGlitching(true)

      // Create glitched text by replacing random characters
      const textToGlitch = displayText || text.substring(0, 1)
      let glitched = ""

      for (let i = 0; i < textToGlitch.length; i++) {
        // 50% chance to replace each character with a random one
        if (Math.random() < 0.5) {
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          glitched += randomChar
        } else {
          glitched += textToGlitch[i]
        }
      }

      setGlitchText(glitched)

      // Choose a random glitch effect class
      const glitchEffects = ["glitch-skew", "glitch-color", "glitch-shift", "glitch-corrupt"]
      const randomEffect = glitchEffects[Math.floor(Math.random() * glitchEffects.length)]
      setGlitchClass(randomEffect)

      // Reset after glitch duration
      setTimeout(() => {
        setIsGlitching(false)
        setGlitchText("")
        setGlitchClass("")
      }, glitchDuration)
    }
  }, [displayText, text, isGlitching, glitchProbability, glitchDuration])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    // Possibly trigger a glitch effect
    triggerGlitch()

    switch (phase) {
      case "typing":
        if (displayText.length < text.length) {
          timeoutId = setTimeout(() => {
            setDisplayText(text.substring(0, displayText.length + 1))
          }, typingSpeed)
        } else {
          setPhase("pausing-typed")
        }
        break

      case "pausing-typed":
        timeoutId = setTimeout(() => {
          setPhase("deleting")
        }, delayAfterTyping)
        break

      case "deleting":
        if (displayText.length > 0) {
          timeoutId = setTimeout(() => {
            setDisplayText(displayText.substring(0, displayText.length - 1))
          }, deletingSpeed)
        } else {
          setPhase("pausing-deleted")
        }
        break

      case "pausing-deleted":
        timeoutId = setTimeout(() => {
          setPhase("typing")
        }, delayAfterDeleting)
        break
    }

    return () => clearTimeout(timeoutId)
  }, [displayText, phase, text, typingSpeed, deletingSpeed, delayAfterTyping, delayAfterDeleting, triggerGlitch])

  return (
    <span className="inline-block text-primary">
      {isGlitching ? <span className={`${glitchClass}`}>{glitchText}</span> : displayText}
      <span className="inline-block w-3 h-5 bg-primary ml-1 animate-blink"></span>
    </span>
  )
}
