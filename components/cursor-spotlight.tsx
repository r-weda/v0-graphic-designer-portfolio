"use client"

import { useState, useEffect } from "react"

interface CursorSpotlightProps {
  isHovering: boolean
}

export function CursorSpotlight({ isHovering }: CursorSpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [trailId, setTrailId] = useState(0)

  useEffect(() => {
    let trailTimeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      if (Math.random() > 0.7) {
        const newId = trailId + 1
        setTrailId(newId)
        setTrailPositions((prev) => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: newId }])

        trailTimeout = setTimeout(() => {
          setTrailPositions((prev) => prev.filter((p) => p.id !== newId))
        }, 500)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(trailTimeout)
    }
  }, [trailId])

  const size = isHovering ? 800 : 400
  const color = isHovering ? "rgba(255, 140, 0, 0.25)" : "rgba(255, 140, 0, 0.15)"

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {/* Main spotlight with orange glow */}
      <div
        className="transition-all duration-200"
        style={{
          position: "fixed",
          background: `radial-gradient(${size}px at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {trailPositions.map((pos, idx) => (
        <div
          key={pos.id}
          className="fixed pointer-events-none rounded-full"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: "8px",
            height: "8px",
            background: `rgba(255, 140, 0, ${0.6 - idx * 0.08})`,
            boxShadow: `0 0 ${10 - idx} rgba(255, 140, 0, ${0.5 - idx * 0.06})`,
            transform: "translate(-50%, -50%)",
            animation: `fadeOut 0.5s ease-out forwards`,
          }}
        />
      ))}

      <style>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
        }
      `}</style>
    </div>
  )
}
