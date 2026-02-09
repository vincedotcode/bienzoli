"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Bot, Brain, FileText, Zap, Sparkles } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

export function AISection() {
  const t = useTranslations()
  const features = [
    { icon: Bot, title: t.ai.f1Title, desc: t.ai.f1Desc },
    { icon: Brain, title: t.ai.f2Title, desc: t.ai.f2Desc },
    { icon: FileText, title: t.ai.f3Title, desc: t.ai.f3Desc },
    { icon: Zap, title: t.ai.f4Title, desc: t.ai.f4Desc },
  ]

  return (
    <section id="ai" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 radial-glow-coral opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text side */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/5 px-4 py-1.5 text-xs font-medium text-coral">
              <Sparkles className="h-3.5 w-3.5" />
              {t.ai.badge}
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">{t.ai.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.ai.subtitle}</p>
            <div className="mt-10 space-y-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral/10 text-coral">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral" />
              </span>
              {t.ai.comingSoon}
            </motion.div>
          </motion.div>

          {/* Illustration side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-coral/20 via-lagoon/10 to-transparent blur-3xl" />
              {/* Card */}
              <div className="relative rounded-2xl border border-border/50 bg-card/80 p-8 backdrop-blur-sm">
                <Image
                  src="/illustrations/ai-assistant.jpg"
                  alt="AI assistant illustration"
                  width={400}
                  height={400}
                  className="rounded-xl"
                />
                {/* Floating chat bubble */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 rounded-xl border border-border/50 bg-card p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-coral" />
                    <span className="text-xs font-medium text-foreground">AI Assistant</span>
                  </div>
                  <div className="mt-1.5 flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
                {/* Floating score badge */}
                <motion.div
                  animate={{ y: [3, -5, 3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-3 -left-3 rounded-lg border border-border/50 bg-card p-2.5 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Brain className="h-3.5 w-3.5 text-lagoon" />
                    <span className="text-xs text-muted-foreground">Lead Score:</span>
                    <span className="text-xs font-bold text-lagoon">92%</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
