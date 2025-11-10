"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

export interface PortfolioItem {
  id: number
  title: string
  src: string
  category: string
  description: string
  tools: string[]
}

interface ProjectModalProps {
  project: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-950 border-gray-800 text-white max-w-4xl w-[95vw] p-0 rounded-lg">
        <div className="relative w-full aspect-video">
          <Image
            src={project.src || "/placeholder.svg"}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-red-500 mb-1">{project.title}</DialogTitle>
            <DialogDescription className="text-gray-400 text-base sm:text-lg">{project.category}</DialogDescription>
          </DialogHeader>
          <div className="mt-6 text-gray-300 leading-relaxed prose prose-invert prose-p:text-gray-300">
            <p>{project.description}</p>
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-200 mb-3">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
