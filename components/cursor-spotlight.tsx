"use client"

import { useState, useEffect } from "react"

interface CursorSpotlightProps {
  isHovering: boolean
}

export function CursorSpotlight({ isHovering }: CursorSpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trailPositions] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [trailId, setTrailId] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const size = isHovering ? 300 : 200
  const color = isHovering ? "rgba(255, 140, 0, 0.08)" : "rgba(255, 140, 0, 0.04)"

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Main spotlight with orange glow */}
      <div
        className="will-change-[background]"
        style={{
          position: "fixed",
          background: `radial-gradient(${size}px at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {trailPositions.length === 0 && null}
    </div>
  )
}
