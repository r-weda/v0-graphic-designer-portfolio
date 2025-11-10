"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import type { PortfolioItem } from "@/components/project-modal"
import { Eye } from "lucide-react"

interface PortfolioGridProps {
  items: PortfolioItem[]
  onSelectProject: (project: PortfolioItem) => void
}

export function PortfolioGrid({ items, onSelectProject }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((item) => item.category)))
    return ["All", ...cats]
  }, [items])

  const filteredItems = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") {
      return items
    }
    return items.filter((item) => item.category === selectedCategory)
  }, [items, selectedCategory])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === "All" ? null : category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              (category === "All" && selectedCategory === null) || (category !== "All" && selectedCategory === category)
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/50"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="group cursor-pointer rounded-lg overflow-hidden bg-slate-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-fade-in"
            style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "forwards" }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelectProject(item)}
          >
            <div className="relative h-64 md:h-72 overflow-hidden bg-slate-900">
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-300 line-clamp-2 mt-1">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {item.tools?.slice(0, 2).map((tool, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-900/50 text-slate-200 text-xs rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="p-2 bg-orange-600 rounded-full">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No projects found in this category.</p>
        </div>
      )}
    </div>
  )
}
