"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

export function Pricing() {
  const t = useTranslations()

  const tiers = [
    {
      name: t.pricing.starterName,
      price: "Rs 14,900",
      description: t.pricing.starterDesc,
      features: [t.pricing.feat1, t.pricing.feat2, t.pricing.feat3, t.pricing.feat4],
      highlighted: false,
    },
    {
      name: t.pricing.growthName,
      price: "Rs 34,900",
      description: t.pricing.growthDesc,
      features: [t.pricing.feat5, t.pricing.feat6, t.pricing.feat7, t.pricing.feat8, t.pricing.feat9],
      highlighted: true,
    },
    {
      name: t.pricing.scaleName,
      price: "Rs 74,900",
      description: t.pricing.scaleDesc,
      features: [t.pricing.feat10, t.pricing.feat11, t.pricing.feat12, t.pricing.feat13, t.pricing.feat14, t.pricing.feat15],
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon">
            {t.pricing.badge}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.pricing.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.pricing.subtitle}
          </motion.p>
        </div>
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-500 ${
                tier.highlighted ? "border-lagoon/40 bg-card glow-lagoon" : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card"
              }`}
            >
              {tier.highlighted && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lagoon to-transparent" />}
              {tier.highlighted && <span className="absolute -top-3 left-6 rounded-full bg-lagoon px-3 py-1 text-[11px] font-semibold text-white">{t.pricing.popular}</span>}
              <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold tracking-tight text-foreground">{tier.price}</span>
              </div>
              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full rounded-full font-medium ${tier.highlighted ? "bg-foreground text-background hover:bg-foreground/90" : "bg-transparent"}`}
                variant={tier.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href="/contact">{t.pricing.getStarted}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
