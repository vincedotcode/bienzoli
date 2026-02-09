"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

function FloatingEl({ children, delay, dur, className }: { children: React.ReactNode; delay: number; dur: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay + 0.5, duration: 0.6 }} className={className}>
      <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const t = useTranslations()
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[900px] radial-glow-lagoon" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[600px] radial-glow-coral" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
      </div>

      {/* BIG floating wave logo -- hero centerpiece behind text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[5]"
      >
        <motion.div
          animate={{ y: [-12, 12, -12], rotate: [-2, 2, -2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/logo_normal_transparent.png"
            alt=""
            width={600}
            height={600}
            className="h-[320px] w-auto opacity-[0.06] sm:h-[420px] lg:h-[550px] dark:opacity-[0.04]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Floating Mauritian illustrations */}
      <FloatingEl delay={0.3} dur={5} className="absolute top-28 right-[6%] hidden lg:block">
        <div className="relative h-52 w-52 overflow-hidden rounded-3xl opacity-[0.15] dark:opacity-[0.1]">
          <Image src="/illustrations/mauritian-developer.jpg" alt="" fill className="object-cover" />
        </div>
      </FloatingEl>
      <FloatingEl delay={0.8} dur={7} className="absolute bottom-28 left-[4%] hidden lg:block">
        <div className="relative h-40 w-40 overflow-hidden rounded-3xl opacity-[0.12] dark:opacity-[0.08]">
          <Image src="/illustrations/mauritian-celebration.jpg" alt="" fill className="object-cover" />
        </div>
      </FloatingEl>

      {/* Floating accent dots */}
      <FloatingEl delay={0.2} dur={6} className="absolute top-48 left-[12%] hidden xl:block">
        <div className="h-2.5 w-2.5 rounded-full bg-lagoon/40" />
      </FloatingEl>
      <FloatingEl delay={0.9} dur={4.5} className="absolute top-64 right-[14%] hidden xl:block">
        <div className="h-3 w-3 rounded-full bg-coral/30" />
      </FloatingEl>
      <FloatingEl delay={1.2} dur={8} className="absolute bottom-48 right-[22%] hidden xl:block">
        <div className="h-2 w-2 rounded-full bg-lagoon/50" />
      </FloatingEl>
      <FloatingEl delay={0.5} dur={5.5} className="absolute bottom-64 left-[18%] hidden xl:block">
        <div className="h-1.5 w-1.5 rounded-full bg-coral/40" />
      </FloatingEl>

      <div className="mx-auto w-full max-w-7xl px-6 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-xs font-medium text-lagoon backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t.hero.title1}{" "}
            <span className="relative z-10 bg-gradient-to-r from-[hsl(199,89%,48%)] to-[hsl(199,89%,65%)] bg-clip-text text-transparent">
              {t.hero.title2}
            </span>{" "}
            <span className="relative">
              {t.hero.title3}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-coral/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M1 9C40 3 80 1 100 3C140 7 180 5 199 1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="group bg-lagoon text-white hover:bg-lagoon/90 gap-2 rounded-full px-8 font-medium shadow-lg shadow-lagoon/20" asChild>
              <Link href="/contact">
                {t.hero.cta1}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 rounded-full border-border/60 bg-transparent hover:bg-muted/50 backdrop-blur-sm" asChild>
              <Link href="#projects">{t.hero.cta2}</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          >
            {[
              { value: "40+", label: t.hero.stat1 },
              { value: "99.9%", label: t.hero.stat2 },
              { value: t.hero.stat3Value, label: t.hero.stat3 },
            ].map((s, i) => (
              <div key={s.label} className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                  className="text-2xl font-bold text-foreground sm:text-3xl"
                >
                  {s.value}
                </motion.div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
