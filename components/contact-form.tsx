"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { submitContactForm } from "@/app/contact/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, AlertTriangle, Send } from "lucide-react"

const initialState = {
  message: "",
  success: false,
}

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      color: string
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 3,
        life: 1,
        color: ["#FF8C00", "#FFA500", "#FFB84D", "#FFFFFF"][Math.floor(Math.random() * 4)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.y += p.vy
        p.x += p.vx
        p.vy += 0.1
        p.life -= 0.02

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, 8, 8)
      }

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      } else {
        canvas.remove()
      }
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }, [state.success])

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="max-w-xl mx-auto">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 text-left relative">
              <Label
                htmlFor="name"
                className={`text-sm font-medium transition-all duration-300 ${
                  focusedField === "name" ? "text-orange-500" : "text-slate-300"
                }`}
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="bg-slate-800 border-slate-700 text-white focus:ring-orange-500 focus:border-orange-500 focus:ring-2 transition-all duration-300"
              />
            </div>
            <div className="space-y-2 text-left relative">
              <Label
                htmlFor="email"
                className={`text-sm font-medium transition-all duration-300 ${
                  focusedField === "email" ? "text-orange-500" : "text-slate-300"
                }`}
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="bg-slate-800 border-slate-700 text-white focus:ring-orange-500 focus:border-orange-500 focus:ring-2 transition-all duration-300"
              />
            </div>
          </div>
          <div className="space-y-2 text-left relative">
            <Label
              htmlFor="message"
              className={`text-sm font-medium transition-all duration-300 ${
                focusedField === "message" ? "text-orange-500" : "text-slate-300"
              }`}
            >
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              required
              rows={5}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              className="bg-slate-800 border-slate-700 text-white focus:ring-orange-500 focus:border-orange-500 focus:ring-2 transition-all duration-300 resize-none"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-slate-600 hover:shadow-lg hover:shadow-orange-600/50 hover:-translate-y-0.5"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
            {state.message && (
              <div
                className={`flex items-center gap-2 text-sm p-3 rounded-md animate-fade-in ${
                  state.success
                    ? "bg-green-900/50 text-green-300 border border-green-700"
                    : "bg-red-900/50 text-red-300 border border-red-700"
                }`}
              >
                {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                {state.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
