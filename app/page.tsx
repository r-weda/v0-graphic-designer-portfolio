"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectModal, type PortfolioItem } from "@/components/project-modal"
import { CursorSpotlight } from "@/components/cursor-spotlight"
import { ContactForm } from "@/components/contact-form"
import { TimelineItem } from "@/components/timeline-item"
import { SkillsGrid } from "@/components/skills-grid"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FeaturedWork } from "@/components/featured-work"
import { Mail, Linkedin, Bean as Behance, Youtube, Phone, Menu, X, ArrowRight, ChevronDown } from "lucide-react"

const portfolioItems: Record<string, PortfolioItem[]> = {
  video: [
    {
      id: 1,
      title: "Content Creation Showreel",
      src: "/professional-video-production.jpg",
      category: "Video Production",
      description:
        "A dynamic showreel showcasing cinematic content creation work, featuring professional cinematography, color grading, and creative storytelling through video. This compilation demonstrates expertise in Adobe Premiere Pro, After Effects, and production techniques.",
      tools: ["Adobe Premiere Pro", "After Effects", "Audition"],
    },
    {
      id: 2,
      title: "Corporate Video Campaign",
      src: "/corporate-video-campaign.jpg",
      category: "Video Production",
      description:
        "Professional corporate communication video produced for institutional clients. Features high-quality cinematography, professional color correction, and compelling narrative structure designed to engage corporate audiences.",
      tools: ["Canon/Sony Cameras", "Adobe Premiere Pro", "After Effects"],
    },
    {
      id: 3,
      title: "Social Media Content Series",
      src: "/social-media-video.png",
      category: "Content Creation",
      description:
        "Engaging short-form video content optimized for social media platforms. Combines quick editing, trending audio, and visual effects to maximize engagement and reach.",
      tools: ["Premiere Pro", "After Effects", "Adobe Audition"],
    },
  ],
  photography: [
    {
      id: 1,
      title: "Wedding Photography Portfolio",
      src: "/professional-wedding-photography.jpg",
      category: "Photography",
      description:
        "Comprehensive wedding coverage showcasing candid moments, professional portraits, and emotional storytelling. Features advanced lighting techniques and post-processing expertise.",
      tools: ["Canon/Nikon/Sony", "Lightroom", "Photoshop"],
    },
    {
      id: 2,
      title: "Corporate Event Photography",
      src: "/corporate-event-networking.png",
      category: "Photography",
      description:
        "Professional corporate and institutional event coverage including conferences, product launches, and organizational events. High-quality editorial photography for corporate communication.",
      tools: ["Professional DSLR", "Lightroom", "Photoshop"],
    },
    {
      id: 3,
      title: "Portrait & Headshot Collection",
      src: "/professional-portrait.png",
      category: "Photography",
      description:
        "Professional portrait photography including corporate headshots, editorial portraits, and lifestyle photography. Features studio lighting setup and natural light techniques.",
      tools: ["Canon/Nikon", "Lightroom", "Capture One"],
    },
  ],
  design: [
    {
      id: 1,
      title: "Brand Identity Design",
      src: "/brand-identity-logo-design.jpg",
      category: "Graphic Design",
      description:
        "Comprehensive brand identity development including logo design, color palette development, and brand guidelines. Designed for corporate clients requiring professional visual identity systems.",
      tools: ["Adobe Illustrator", "Photoshop", "Figma"],
    },
    {
      id: 2,
      title: "Social Media Marketing Design",
      src: "/social-media-marketing-graphics.jpg",
      category: "Graphic Design",
      description:
        "Strategic social media content design including graphics, posters, and promotional materials. Combines typography, imagery, and design principles for maximum impact and engagement.",
      tools: ["Photoshop", "Illustrator", "Canva"],
    },
    {
      id: 3,
      title: "UI/UX Interface Design",
      src: "/user-interface-design-ux.jpg",
      category: "UI/UX Design",
      description:
        "Digital interface design for web and mobile applications. User-centered design approach focusing on accessibility, usability, and visual hierarchy.",
      tools: ["Figma", "Adobe XD", "Illustrator"],
    },
  ],
}

const workExperience = [
  {
    title: "Creative Designer & Media Practitioner",
    company: "University of Embu",
    period: "July 2022 - Present",
    description:
      "Lead creative and media production for institutional communications. Manage visual content creation, video production, and digital asset development. Collaborate with departments on communication strategies.",
  },
  {
    title: "Communication Officer",
    company: "County Government of Vihiga",
    period: "2019 - 2020",
    description:
      "Managed corporate communications and media relations. Coordinated with media outlets, created press materials, and developed communication strategies for government initiatives.",
  },
  {
    title: "Content Creator & Intern",
    company: "Lubao FM",
    period: "2019",
    description:
      "Produced multimedia content for radio station including audio editing, social media content, and on-air graphics. Gained hands-on experience in broadcast media production.",
  },
]

const coreSkills = [
  { category: "Video Production", skills: ["Adobe Premiere Pro", "After Effects", "Adobe Audition", "Cinematography"] },
  { category: "Photography", skills: ["Canon", "Nikon", "Sony", "Lightroom", "Adobe Photoshop"] },
  { category: "Graphic Design", skills: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma"] },
  {
    category: "Content Creation",
    skills: ["Social Media Marketing", "Scriptwriting", "Video Editing", "Content Strategy"],
  },
  {
    category: "Digital Tools",
    skills: ["UI/UX Design", "Digital Marketing", "Adobe Creative Suite", "Design Systems"],
  },
  { category: "Communication", skills: ["Corporate Communication", "Media Relations", "Journalism", "Storytelling"] },
]

export default function DesignerPortfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navbarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false)
      } else {
        setIsNavbarVisible(true)
      }

      setLastScrollY(currentScrollY)
      setShowScrollTop(currentScrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const allPortfolioItems = [...portfolioItems.video, ...portfolioItems.photography, ...portfolioItems.design]

  return (
    <div
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen font-sans relative z-0"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CursorSpotlight isHovering={isHoveringInteractive} />
      <div className="relative z-10">
        <header
          ref={navbarRef}
          className={`fixed top-0 z-30 w-full p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md border-b border-orange-500/20 transition-all duration-300 ease-out ${
            isNavbarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto flex items-center justify-between">
            <Link
              href="#"
              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent"
            >
              BM
            </Link>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <Link href="#portfolio" className="text-slate-300 hover:text-orange-500 transition-colors">
                Portfolio
              </Link>
              <Link href="#about" className="text-slate-300 hover:text-orange-500 transition-colors">
                About
              </Link>
              <Link href="#experience" className="text-slate-300 hover:text-orange-500 transition-colors">
                Experience
              </Link>
              <Link href="#contact" className="text-slate-300 hover:text-orange-500 transition-colors">
                Contact
              </Link>
            </nav>
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-3 border-t border-slate-700/50 pt-4">
              <Link
                href="#portfolio"
                className="block px-2 py-2 text-slate-300 hover:text-orange-500 transition-colors text-sm font-medium"
                onClick={handleMobileNavClick}
              >
                Portfolio
              </Link>
              <Link
                href="#about"
                className="block px-2 py-2 text-slate-300 hover:text-orange-500 transition-colors text-sm font-medium"
                onClick={handleMobileNavClick}
              >
                About
              </Link>
              <Link
                href="#experience"
                className="block px-2 py-2 text-slate-300 hover:text-orange-500 transition-colors text-sm font-medium"
                onClick={handleMobileNavClick}
              >
                Experience
              </Link>
              <Link
                href="#contact"
                className="block px-2 py-2 text-slate-300 hover:text-orange-500 transition-colors text-sm font-medium"
                onClick={handleMobileNavClick}
              >
                Contact
              </Link>
            </nav>
          )}
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 pt-20">
          <section className="relative min-h-screen flex items-center justify-center py-20 sm:py-32">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="text-center space-y-8 fade-in-up max-w-4xl mx-auto">
              <div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight mb-6">
                  Brian
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                    Miheso
                  </span>
                </h1>
                <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-300">
                  Media Practitioner | Creative Designer | Content Creator
                </p>
                <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Transforming ideas into compelling visual stories through cinematography, design, and strategic
                  communication. Award-accredited media professional based in Kenya.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:gap-3"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-orange-300 font-semibold rounded-lg transition-all duration-300"
                >
                  Get In Touch
                  <Mail className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 border-t border-slate-700/50">
                <Link
                  href="tel:+254758073530"
                  className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-orange-500 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+254 758 073 530</span>
                </Link>
                <Link
                  href="mailto:brianmihesoscoh@gmail.com"
                  className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-orange-500 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">brianmihesoscoh@gmail.com</span>
                </Link>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-6 h-6 text-orange-500/60" />
              </div>
            </div>
          </section>

          <section className="my-20 sm:my-32">
            <StatsSection />
          </section>

          <section className="my-20 sm:my-32">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">Featured Work</h2>
              <p className="text-slate-400 text-lg">Highlighting key projects that showcase creative expertise</p>
            </div>
            <FeaturedWork />
          </section>

          <section id="portfolio" className="my-20 sm:my-32">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">Complete Portfolio</h2>
              <p className="text-slate-400 text-lg">
                Browse all projects across video production, photography, and graphic design
              </p>
            </div>
            <PortfolioGrid items={allPortfolioItems} onSelectProject={setSelectedProject} />
          </section>

          <section id="skills" className="my-20 sm:my-32">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-12">Core Skills & Expertise</h2>
            <SkillsGrid skills={coreSkills} />
          </section>

          <section className="my-20 sm:my-32">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">Client Testimonials</h2>
              <p className="text-slate-400 text-lg">
                What clients and collaborators have to say about working together
              </p>
            </div>
            <TestimonialsSection />
          </section>

          <section id="about" className="my-20 sm:my-32">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">About Me</h2>
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                  <p>
                    I'm a trained journalist with a BSc in Communication and Journalism from Maasai Mara University,
                    accredited by the Media Council of Kenya. With a passion for multimedia storytelling, I combine
                    journalistic integrity with creative design and production expertise.
                  </p>
                  <p>
                    As a Creative Designer at the University of Embu (PSC Intern Cohort 3), I transform complex
                    information into compelling visual and multimedia narratives. My work spans corporate communication,
                    media relations, content creation, and strategic visual communication.
                  </p>
                  <p>
                    Specializing in graphic design, video production, cinematography, and photography, I help brands and
                    organizations tell their stories through professional multimedia content. I'm passionate about
                    music, art, and Kenyan culture, bringing a unique creative perspective to every project.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Education</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-orange-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg text-white">BSc in Communication and Journalism</h3>
                    <p className="text-orange-500 font-semibold">Maasai Mara University</p>
                    <p className="text-sm text-slate-400 mt-2">Accredited by Media Council of Kenya</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-white mb-3">Professional Focus</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-orange-500">•</span> Corporate Communication & Media Relations
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-500">•</span> Multimedia Content Creation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-500">•</span> Visual Storytelling & Design
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-orange-500">•</span> Strategic Communication Planning
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="experience" className="my-20 sm:my-32">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-12">Work Experience</h2>
            <div className="space-y-0">
              {workExperience.map((exp, index) => (
                <TimelineItem key={index} {...exp} isLast={index === workExperience.length - 1} />
              ))}
            </div>
          </section>

          <section id="contact" className="my-20 sm:my-32 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Let's Create Together</h2>
            <p className="max-w-xl mx-auto text-slate-400 text-lg mb-12">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
            <ContactForm />
            <div className="mt-16">
              <p className="text-lg text-slate-400 mb-6">Connect with me</p>
              <div className="flex justify-center items-center space-x-6 sm:space-x-8">
                <Link
                  href="mailto:brianmihesoscoh@gmail.com"
                  className="text-slate-400 hover:text-orange-500 transition-colors hover:scale-110 duration-300"
                >
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">Email</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/brian-miheso-98b962a1/"
                  target="_blank"
                  className="text-slate-400 hover:text-orange-500 transition-colors hover:scale-110 duration-300"
                >
                  <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://www.behance.net/brianmihesoscoh"
                  target="_blank"
                  className="text-slate-400 hover:text-orange-500 transition-colors hover:scale-110 duration-300"
                >
                  <Behance className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">Behance</span>
                </Link>
                <Link
                  href="https://www.youtube.com/@user-BrianMiheso"
                  target="_blank"
                  className="text-slate-400 hover:text-orange-500 transition-colors hover:scale-110 duration-300"
                >
                  <Youtube className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-20"
            aria-label="Scroll to top"
          >
            <ChevronDown className="w-6 h-6 rotate-180" />
          </button>
        )}

        <footer className="container mx-auto px-6 py-8 text-center text-slate-500 border-t border-slate-700/50">
          <p>
            &copy; {new Date().getFullYear()} Brian Miheso. All Rights Reserved. | Media Practitioner • Creative
            Designer • Content Creator
          </p>
        </footer>
      </div>
    </div>
  )
}
