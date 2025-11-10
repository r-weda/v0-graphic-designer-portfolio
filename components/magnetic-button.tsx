"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < 150) {
        setOffset({
          x: (distX / distance) * Math.min(distance / 150, 1) * 12,
          y: (distY / distance) * Math.min(distance / 150, 1) * 12,
        })
      } else {
        setOffset({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 })
    }

    window.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </button>
  )
}
