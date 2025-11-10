"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ProjectModal, type PortfolioItem } from "@/components/project-modal"
import { CursorSpotlight } from "@/components/cursor-spotlight"
import { ContactForm } from "@/components/contact-form"
import { Mail, Linkedin, Dribbble, Instagram } from "lucide-react"

const portfolioItems: Record<string, PortfolioItem[]> = {
  branding: [
    {
      id: 1,
      title: "Aroma Coffee Co.",
      src: "/placeholder.svg?height=300&width=500",
      category: "Branding & Identity",
      description:
        "A comprehensive branding suite for a new artisanal coffee shop. The goal was to create a warm, modern, and memorable identity that translates seamlessly from coffee cups to digital menus. The project included logo design, a custom typography system, packaging, and in-store signage.",
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
    },
    {
      id: 2,
      title: "Nexus SaaS",
      src: "/placeholder.svg?height=300&width=500",
      category: "Branding & UI/UX",
      description:
        "Rebranding for a B2B software-as-a-service platform. The new identity needed to be professional yet dynamic, reflecting the software's cutting-edge capabilities. We developed a new logo, color palette, and a complete UI style guide.",
      tools: ["Adobe Illustrator", "Adobe XD", "Figma"],
    },
    {
      id: 3,
      title: "Glow Skincare",
      src: "/placeholder.svg?height=300&width=500",
      category: "Packaging & Branding",
      description:
        "Visual identity and packaging design for an organic skincare line. The design emphasizes natural ingredients and a sense of luxury, using soft colors, elegant typography, and minimalist layouts to appeal to a discerning audience.",
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Procreate"],
    },
    {
      id: 4,
      title: "Equinox Music Fest",
      src: "/placeholder.svg?height=300&width=500",
      category: "Event Branding",
      description:
        "A vibrant and psychedelic branding system for an annual music and arts festival. The design captures the energetic and eclectic spirit of the event, used across posters, social media campaigns, merchandise, and on-site installations.",
      tools: ["Adobe Illustrator", "Procreate", "Adobe After Effects"],
    },
    {
      id: 5,
      title: "The Sovereign Hotel",
      src: "/placeholder.svg?height=300&width=500",
      category: "Hospitality Branding",
      description:
        "An art-deco inspired identity for a luxury boutique hotel. The branding evokes timeless elegance and sophistication, applied to everything from the main logo and room keys to restaurant menus and website design.",
      tools: ["Adobe Illustrator", "Adobe InDesign"],
    },
  ],
  webDesign: [
    {
      id: 1,
      title: "Atelier Fashion E-commerce",
      src: "/placeholder.svg?height=400&width=500",
      category: "Web Design & UI/UX",
      description:
        "A clean, modern, and image-focused e-commerce website for a high-end fashion brand. The user experience is designed to be seamless and intuitive, guiding users from browsing to checkout effortlessly. The UI is minimalist to let the products shine.",
      tools: ["Figma", "Sketch", "Next.js", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Wanderlust Travel Blog",
      src: "/placeholder.svg?height=400&width=500",
      category: "Web Design",
      description:
        "A visually-driven website for a travel photographer and blogger. The design uses large, immersive images and elegant typography to tell compelling stories. The layout is a custom-coded masonry grid that is fully responsive.",
      tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: 3,
      title: "Photographer's Portfolio",
      src: "/placeholder.svg?height=400&width=500",
      category: "Web Design",
      description:
        "A minimalist and artistic portfolio website for a professional photographer. The design prioritizes the artwork, with a clean interface, subtle animations, and a dark theme that makes the colors in the photos pop.",
      tools: ["Figma", "Webflow", "JavaScript"],
    },
    {
      id: 4,
      title: "Fintech Dashboard",
      src: "/placeholder.svg?height=400&width=500",
      category: "UI/UX Design",
      description:
        "A complex data visualization dashboard for a financial technology company. The UI/UX was designed to simplify complex data, making it easy for users to track investments, view analytics, and generate reports through intuitive charts and graphs.",
      tools: ["Figma", "React", "D3.js"],
    },
    {
      id: 5,
      title: "Gourmet Recipe App",
      src: "/placeholder.svg?height=400&width=500",
      category: "Mobile App Design",
      description:
        "A user-friendly and colorful mobile app for discovering and saving recipes. The interface is designed to be fun and engaging, with features like a step-by-step cooking mode, ingredient checklists, and user-submitted photos.",
      tools: ["Figma", "Swift", "Kotlin"],
    },
  ],
  illustration: [
    {
      id: 1,
      title: "Cosmic Contemplation",
      src: "/placeholder.svg?height=500&width=500",
      category: "Editorial Illustration",
      description:
        "A surreal and thought-provoking editorial illustration for a magazine cover about the future of space exploration. The artwork combines celestial elements with human figures to evoke a sense of wonder and introspection.",
      tools: ["Procreate", "Adobe Photoshop", "Wacom Tablet"],
    },
    {
      id: 2,
      title: "Ferdinand the Fox",
      src: "/placeholder.svg?height=500&width=500",
      category: "Character Design",
      description:
        "Character design for a children's book protagonist, Ferdinand the Fox. He is a curious and brave adventurer, and his design reflects his personality with expressive features and a friendly demeanor.",
      tools: ["Procreate", "Clip Studio Paint", "Wacom Tablet"],
    },
    {
      id: 3,
      title: "Atmospheric Album Art",
      src: "/placeholder.svg?height=500&width=500",
      category: "Album Art",
      description:
        "Abstract and atmospheric album cover for an ambient electronic artist. The artwork uses gradients, textures, and subtle geometric shapes to visually represent the soundscape of the music.",
      tools: ["Adobe Photoshop", "Affinity Photo", "TouchDesigner"],
    },
    {
      id: 4,
      title: "Botanical Packaging",
      src: "/placeholder.svg?height=500&width=500",
      category: "Packaging Illustration",
      description:
        "A series of detailed botanical line-art illustrations for a brand of organic teas. Each illustration corresponds to a different tea blend, featured prominently on the packaging to highlight the natural ingredients.",
      tools: ["Adobe Illustrator", "Wacom Tablet"],
    },
    {
      id: 5,
      title: "The Water Cycle Infographic",
      src: "/placeholder.svg?height=500&width=500",
      category: "Infographic Design",
      description:
        "A detailed and engaging infographic explaining the water cycle for an educational publication. The illustration simplifies a complex process into an easy-to-understand visual narrative, suitable for both print and digital formats.",
      tools: ["Adobe Illustrator", "Figma"],
    },
  ],
}

export default function DesignerPortfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button, .cursor-pointer")) {
      setIsHoveringInteractive(true)
    }
  }

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button, .cursor-pointer")) {
      setIsHoveringInteractive(false)
    }
  }

  return (
    <div
      className="bg-gray-950 text-white min-h-screen font-sans relative z-0"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CursorSpotlight isHovering={isHoveringInteractive} />
      <div className="relative z-10">
        <header className="sticky top-0 z-30 w-full p-4 sm:p-6 bg-gray-950/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="#" className="text-2xl font-bold tracking-tight text-red-500">
              v0 creator
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="#portfolio" className="hover:text-red-500 transition-colors">
                Portfolio
              </Link>
              <Link href="#about" className="hover:text-red-500 transition-colors">
                About
              </Link>
              <Link href="#contact" className="hover:text-red-500 transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon">
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <section className="text-center my-12 sm:my-20">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter">
              Crafting Visuals,
              <br />
              <span className="text-red-500">Telling Stories.</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl">
              A passionate graphic designer specializing in branding, UI/UX, and digital illustration.
            </p>
          </section>

          <section id="portfolio" className="space-y-12 sm:space-y-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Branding & Identity</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                  {portfolioItems.branding.map((item) => (
                    <div
                      key={item.id}
                      className="group block flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer"
                      onClick={() => setSelectedProject(item)}
                    >
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-medium group-hover:text-red-500 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Web & UI/UX Design</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                  {portfolioItems.webDesign.map((item) => (
                    <div
                      key={item.id}
                      className="group block flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer"
                      onClick={() => setSelectedProject(item)}
                    >
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={400}
                          className="aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-medium group-hover:text-red-500 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Illustration</h2>
              <div className="relative">
                <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                  {portfolioItems.illustration.map((item) => (
                    <div
                      key={item.id}
                      className="group block flex-shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer"
                      onClick={() => setSelectedProject(item)}
                    >
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={500}
                          className="aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-3 text-base font-medium group-hover:text-red-500 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400">{item.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="my-20 sm:my-32">
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12 items-center">
              <div className="md:col-span-1">
                <Avatar className="w-40 h-40 sm:w-48 sm:h-48 mx-auto md:mx-0 border-4 border-red-500">
                  <AvatarImage src="/placeholder.svg?height=200&width=200" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">About Me</h2>
                <p className="text-gray-300 leading-relaxed">
                  I'm a creative and detail-oriented graphic designer with over 8 years of experience in delivering
                  impactful visual solutions. My work is driven by a passion for clean aesthetics and user-centric
                  design. I thrive on collaborating with clients to translate their vision into compelling brand stories
                  and digital experiences.
                </p>
              </div>
            </div>
          </section>

          <section id="contact" className="my-20 sm:my-32 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Let's Create Together</h2>
            <p className="max-w-xl mx-auto text-gray-400 mb-12">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
            <ContactForm />
            <div className="mt-16">
              <p className="text-lg text-gray-400 mb-6">Or find me on</p>
              <div className="flex justify-center items-center space-x-6 sm:space-x-8">
                <Link href="mailto:hello@v0creator.dev" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">Email</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Dribbble className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">Dribbble</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Instagram className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />

        <footer className="container mx-auto px-6 py-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} v0 creator. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  )
}
