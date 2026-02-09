"use client"

import { motion } from "framer-motion"
import { Globe, Bot, Users, MessageSquare, BarChart3, Headphones } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

export function Features() {
  const t = useTranslations()
  const features = [
    { icon: Globe, title: t.features.f1Title, desc: t.features.f1Desc, color: "lagoon" as const },
    { icon: Bot, title: t.features.f2Title, desc: t.features.f2Desc, color: "coral" as const },
    { icon: Users, title: t.features.f3Title, desc: t.features.f3Desc, color: "lagoon" as const },
    { icon: MessageSquare, title: t.features.f4Title, desc: t.features.f4Desc, color: "coral" as const },
    { icon: BarChart3, title: t.features.f5Title, desc: t.features.f5Desc, color: "lagoon" as const },
    { icon: Headphones, title: t.features.f6Title, desc: t.features.f6Desc, color: "coral" as const },
  ]

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-xs font-medium text-lagoon">{t.features.badge}</span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">{t.features.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.features.subtitle}</p>
        </motion.div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.color === "lagoon" ? "bg-lagoon/10 text-lagoon" : "bg-coral/10 text-coral"}`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${f.color === "lagoon" ? "from-transparent via-lagoon/40 to-transparent" : "from-transparent via-coral/40 to-transparent"} opacity-0 transition-opacity group-hover:opacity-100`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
