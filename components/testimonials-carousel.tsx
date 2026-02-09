"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

type Testimonial = {
  id: number
  name: string
  company: string | null
  role: string | null
  quote: string
  rating: number
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations()

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon">
            {t.testimonials.badge}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.testimonials.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.testimonials.subtitle}
          </motion.p>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-border hover:bg-card"
            >
              <Quote className="h-8 w-8 text-lagoon/15 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={`star-${item.id}-${i}`} className="h-3.5 w-3.5 fill-coral text-coral" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{`"${item.quote}"`}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-lagoon/20 to-coral/20">
                  <span className="text-xs font-bold text-foreground">{item.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}{item.company ? `, ${item.company}` : ""}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
