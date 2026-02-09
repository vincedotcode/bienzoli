"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MessageSquare, PenTool, Rocket } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

export function HowItWorks() {
  const t = useTranslations()
  const steps = [
    { number: "01", icon: MessageSquare, title: t.howItWorks.s1Title, desc: t.howItWorks.s1Desc, img: "/illustrations/mauritian-team.jpg" },
    { number: "02", icon: PenTool, title: t.howItWorks.s2Title, desc: t.howItWorks.s2Desc, img: "/illustrations/mauritian-developer.jpg" },
    { number: "03", icon: Rocket, title: t.howItWorks.s3Title, desc: t.howItWorks.s3Desc, img: "/illustrations/mauritian-celebration.jpg" },
  ]

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon">
            {t.howItWorks.badge}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.howItWorks.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.howItWorks.subtitle}
          </motion.p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="relative h-40 overflow-hidden">
                <Image src={step.img || "/placeholder.svg"} alt={step.title} fill className="object-cover opacity-50 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/50" />
                <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/80 backdrop-blur-sm">
                  <step.icon className="h-4 w-4 text-lagoon" />
                </div>
              </div>
              <div className="p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] text-coral uppercase">
                  {"Step "}{step.number}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
