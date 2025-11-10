"use client"

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface Testimonial {
  quote: string
  author: string
  role: string
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoPlay] = useState(false)

  const testimonials: Testimonial[] = [
    {
      quote:
        "Brian's creativity and attention to detail transformed our communication materials. His multimedia approach brought our message to life in ways we hadn't imagined.",
      author: "Dr. Margaret Kipkoech",
      role: "Director of Communications, University of Embu",
    },
    {
      quote:
        "Working with Brian on our brand identity was exceptional. He understood our vision and delivered designs that perfectly captured our values and mission.",
      author: "James Kipchoge",
      role: "County Communications Director, Vihiga County",
    },
    {
      quote:
        "From video production to photography, Brian brings a professional standard to every project. His media relations expertise made a significant impact on our initiatives.",
      author: "Sarah Mwangi",
      role: "Communications Officer, Corporate Client",
    },
  ]

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="space-y-8">
      <div className="relative max-w-2xl mx-auto">
        {/* Carousel Items */}
        <div className="relative h-96 sm:h-80">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === current
                  ? "opacity-100 scale-100 translate-x-0"
                  : index > current
                    ? "opacity-0 scale-95 translate-x-full"
                    : "opacity-0 scale-95 -translate-x-full"
              }`}
            >
              <div className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 h-full flex flex-col hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <Quote className="w-8 h-8 text-orange-500/30 mb-4 group-hover:text-orange-500 transition-colors" />
                <p className="text-slate-300 leading-relaxed mb-6 flex-1 text-base sm:text-lg">{testimonial.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* On mobile (sm): buttons positioned below carousel, on desktop (sm:): positioned on sides */}
        <button
          onClick={prev}
          className="absolute -bottom-16 left-1/3 sm:-bottom-auto sm:top-1/2 sm:-left-16 transform sm:-translate-y-1/2 -translate-x-1/2 sm:translate-x-0 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 w-12 h-12 flex items-center justify-center"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute -bottom-16 right-1/3 sm:-bottom-auto sm:top-1/2 sm:-right-16 transform sm:-translate-y-1/2 translate-x-1/2 sm:translate-x-0 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 w-12 h-12 flex items-center justify-center"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dot Navigation Indicators */}
      <div className="flex justify-center gap-2 pt-8 sm:pt-0">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-orange-500 w-8" : "bg-slate-600 hover:bg-slate-500"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Fallback static view for mobile or when carousel disabled */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 md:hidden lg:hidden">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
          >
            <Quote className="w-8 h-8 text-orange-500/30 mb-4" />
            <p className="text-slate-300 leading-relaxed mb-6">{testimonial.quote}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
              <div>
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex gap-1 mt-4">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
