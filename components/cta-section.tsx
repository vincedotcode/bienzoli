"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

const WHATSAPP_NUMBER = "23057000000"
const WHATSAPP_MSG = encodeURIComponent("Hi bienzoli! I'd like to discuss a project.")

export function CTASection() {
  const t = useTranslations()

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] radial-glow-lagoon opacity-50" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] radial-glow-coral opacity-30" />
      </div>
      <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-10 top-10 hidden opacity-10 lg:block">
        <Image src="/illustrations/mauritian-celebration.jpg" alt="" width={240} height={240} className="rounded-3xl" />
      </motion.div>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {t.cta.title}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {t.cta.subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group bg-lagoon text-white hover:bg-lagoon/90 gap-2 rounded-full px-8 font-medium" asChild>
            <Link href="/contact">
              {t.cta.cta1}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 rounded-full border-border/60 bg-transparent hover:bg-muted/50" asChild>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              {t.cta.cta2}
            </a>
          </Button>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-6 text-xs text-muted-foreground">
          {t.cta.note}
        </motion.p>
      </div>
    </section>
  )
}
