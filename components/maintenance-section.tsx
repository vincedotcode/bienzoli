"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const WA = "https://wa.me/23057901383"

const plans = [
  {
    name: "ESSENTIAL",
    price: "1,500",
    tagline: "Your site, always up.",
    features: [
      "Hosting & SSL management",
      "Monthly security updates & backups",
      "2 content changes per month",
      "Uptime monitoring",
      "Email support — 48hr response",
    ],
    cta: "Add Essential",
    ctaHref: `${WA}?text=Hi%20bienzoli!%20I%27d%20like%20to%20add%20the%20Essential%20maintenance%20plan.`,
    highlighted: false,
  },
  {
    name: "GROWTH",
    price: "3,000",
    tagline: "Grow while we handle the rest.",
    features: [
      "Everything in Essential",
      "5 content changes per month",
      "Monthly analytics report",
      "Priority WhatsApp support — same-day",
      "Quarterly performance review",
      "Google Business Profile updates",
    ],
    cta: "Add Growth",
    ctaHref: `${WA}?text=Hi%20bienzoli!%20I%27d%20like%20to%20add%20the%20Growth%20maintenance%20plan.`,
    highlighted: true,
  },
]

export function MaintenanceSection() {
  return (
    <section id="maintenance" className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon"
          >
            MAINTENANCE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Keep your site running perfectly.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm leading-relaxed text-muted-foreground"
          >
            Optional plans. No long-term contract — cancel anytime with 30 days notice.
          </motion.p>
        </div>

        {/* Plan cards */}
        <div className="mx-auto mt-10 grid max-w-2xl gap-5 md:grid-cols-2">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-500 ${
                plan.highlighted
                  ? "border-lagoon/40 bg-card glow-lagoon"
                  : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card"
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lagoon to-transparent" />

              {plan.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-coral px-3 py-1 text-[11px] font-semibold text-white">
                  Best Value
                </span>
              )}

              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-lagoon">{plan.name}</p>
              <h3 className="mt-1 text-base font-semibold text-foreground">{plan.tagline}</h3>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-sm font-medium text-muted-foreground">Rs</span>
                <span className="text-3xl font-bold tracking-tight text-foreground font-display">{plan.price}</span>
                <span className="text-sm font-medium text-muted-foreground">/mo</span>
              </div>

              <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lagoon" />
                    <span className="text-muted-foreground leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-7 w-full rounded-full text-sm font-medium ${
                  plan.highlighted
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-transparent"
                }`}
                variant={plan.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href={plan.ctaHref} target="_blank" rel="noopener noreferrer">
                  {plan.cta}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Sub-note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center text-xs text-muted-foreground"
        >
          Maintenance is optional. All sites are fully handed over to you at delivery.{" "}
          <Link
            href={`${WA}?text=Hi%20bienzoli!%20I%20have%20a%20question%20about%20maintenance.`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lagoon hover:underline underline-offset-4"
          >
            Questions? Chat on WhatsApp.
          </Link>
        </motion.p>

      </div>
    </section>
  )
}
