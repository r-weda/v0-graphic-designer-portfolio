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
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        {!isLast && <div className="w-0.5 h-24 bg-gradient-to-b from-amber-500 to-slate-700 mt-2" />}
      </div>
      <div className="pb-8 flex-1">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-amber-500 font-medium">{company}</p>
        <p className="text-sm text-slate-400 mb-3">{period}</p>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
