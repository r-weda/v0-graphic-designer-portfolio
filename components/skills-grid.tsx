interface Skill {
  category: string
  skills: string[]
}

interface SkillsGridProps {
  skills: Skill[]
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="group p-6 rounded-lg border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 hover:bg-slate-800/50"
        >
          <h3 className="text-lg font-semibold text-amber-500 mb-4 group-hover:text-amber-400 transition-colors">
            {skill.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skill.skills.map((s, i) => (
              <span
                key={i}
                className="text-sm px-3 py-1 bg-slate-800 text-slate-300 rounded-full group-hover:bg-slate-700 transition-colors"
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
