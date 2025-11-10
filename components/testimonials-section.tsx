"use client"

import { Star, Quote } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
  role: string
}

export function TestimonialsSection() {
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

  return (
    <div className="grid md:grid-cols-3 gap-8">
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
  )
}
