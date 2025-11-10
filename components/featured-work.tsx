"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface FeaturedProject {
  title: string
  category: string
  description: string
  image: string
  highlights: string[]
}

export function FeaturedWork() {
  const featuredProjects: FeaturedProject[] = [
    {
      title: "Institutional Brand Communication",
      category: "Video Production",
      description:
        "Comprehensive multimedia content strategy for institutional communications. Created cinematic branded content that increased engagement by 45% across digital platforms.",
      image: "/professional-video-production.jpg",
      highlights: ["Cinematic Storytelling", "Brand Strategy", "Multi-platform Distribution"],
    },
    {
      title: "Corporate Identity System",
      category: "Graphic Design",
      description:
        "Complete brand identity development including logo, color system, and comprehensive brand guidelines. Delivered visual coherence across all corporate communications.",
      image: "/brand-identity-logo-design.jpg",
      highlights: ["Logo Design", "Brand Guidelines", "Design System"],
    },
  ]

  return (
    <div className="space-y-16">
      {featuredProjects.map((project, index) => (
        <div key={index} className="group grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={index % 2 === 1 ? "md:order-2" : ""}>
            <div className="relative h-96 rounded-lg overflow-hidden bg-slate-800 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/10 transition-all duration-300">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className={index % 2 === 1 ? "md:order-1" : ""}>
            <div className="space-y-4">
              <div>
                <p className="text-orange-500 font-semibold text-sm uppercase tracking-wide mb-2">{project.category}</p>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">{project.title}</h3>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed">{project.description}</p>

              <div className="space-y-3 py-6">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-400">{highlight}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#portfolio"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold mt-4 group/link transition-all duration-300"
              >
                View Full Project
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
