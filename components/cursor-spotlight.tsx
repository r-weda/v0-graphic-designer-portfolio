"use client"

import { useState, useEffect } from "react"

interface CursorSpotlightProps {
  isHovering: boolean
}

export function CursorSpotlight({ isHovering }: CursorSpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const size = isHovering ? 800 : 400
  const color = isHovering ? "rgba(29, 78, 216, 0.20)" : "rgba(29, 78, 216, 0.15)"

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-300"
      style={{
        background: `radial-gradient(${size}px at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
      }}
    />
  )
}
