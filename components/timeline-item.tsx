"use client"

import { Briefcase, CalendarDays } from "lucide-react"

interface TimelineItemProps {
  title: string
  company: string
  period: string
  description: string
  isLast?: boolean
}

export function TimelineItem({ title, company, period, description, isLast = false }: TimelineItemProps) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full ring-4 ring-orange-500/20 z-10"></div>
          {!isLast && (
            <div className="w-0.5 h-20 md:h-24 bg-gradient-to-b from-orange-500/50 to-slate-700/20 mt-2"></div>
          )}
        </div>
      </div>

      <div className="pb-8 flex-1">
        <div className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">{title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Briefcase className="w-4 h-4 text-orange-500" />
                <p className="text-orange-500 font-semibold">{company}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm whitespace-nowrap">
              <CalendarDays className="w-4 h-4" />
              <span>{period}</span>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed mt-3">{description}</p>
        </div>
      </div>
    </div>
  )
}
