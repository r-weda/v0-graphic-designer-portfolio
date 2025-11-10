"use client"

import type React from "react"

import { Award, Zap, Users, Code } from "lucide-react"

interface Stat {
  icon: React.ReactNode
  label: string
  value: string
}

export function StatsSection() {
  const stats: Stat[] = [
    {
      icon: <Award className="w-6 h-6" />,
      label: "Projects Completed",
      value: "50+",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: "Years Experience",
      value: "5+",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Happy Clients",
      value: "30+",
    },
    {
      icon: <Code className="w-6 h-6" />,
      label: "Media Council Accredited",
      value: "✓",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 text-center hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex justify-center mb-3 text-orange-500 group-hover:scale-110 transition-transform duration-300">
            {stat.icon}
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-slate-400">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
