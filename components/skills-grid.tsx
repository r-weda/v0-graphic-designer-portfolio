"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Code2, Camera, Palette, Share2, Zap, MessageSquare } from "lucide-react"

interface Skill {
  category: string
  skills: string[]
}

interface SkillsGridProps {
  skills: Skill[]
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Video Production": <Code2 className="w-6 h-6" />,
  Photography: <Camera className="w-6 h-6" />,
  "Graphic Design": <Palette className="w-6 h-6" />,
  "Content Creation": <Share2 className="w-6 h-6" />,
  "Digital Tools": <Zap className="w-6 h-6" />,
  Communication: <MessageSquare className="w-6 h-6" />,
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  const [visibleSkills, setVisibleSkills] = useState<Record<number, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number.parseInt(entry.target.getAttribute("data-skill-index") || "0")
          setVisibleSkills((prev) => ({ ...prev, [index]: true }))
        }
      })
    })

    const elements = containerRef.current?.querySelectorAll("[data-skill-index]")
    elements?.forEach((el) => observer.observe(el))

    return () => elements?.forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <div
          key={index}
          data-skill-index={index}
          className={`group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/10 transform ${
            visibleSkills[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-orange-500 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-glow">
              {categoryIcons[skill.category] || <Code2 className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-semibold text-white">{skill.category}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {skill.skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-700/50 text-slate-200 text-sm rounded-full hover:bg-orange-600/20 hover:text-orange-400 transition-all duration-300 border border-slate-600/50 hover:border-orange-500/30 cursor-default hover:scale-105 transform"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
