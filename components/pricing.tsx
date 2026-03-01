"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const WA = "https://wa.me/23057901383"

const tiers = [
  {
    city: "FLIC EN FLAC",
    tagline: "Get online fast.",
    price: "8,000",
    priceLabel: "one-time",
    delivery: "24–48 hours",
    audience: "Micro-businesses getting online for the first time.",
    features: [
      "Single-page micro-site",
      "Hero, services, contact & WhatsApp CTA",
      "Clean design, your branding applied",
      "Mobile responsive",
      "Domain setup (1 year)",
      "Hosting (1 year)",
    ],
    bestFor: "Hairdressers, food vendors, freelancers, tutors, market stalls",
    revisions: "1 revision round",
    cta: "Start on WhatsApp",
    ctaHref: `${WA}?text=Hi%20bienzoli!%20I%27d%20like%20to%20start%20with%20the%20FLIC%20EN%20FLAC%20package.`,
    tone: "lagoon",
    highlighted: false,
  },
  {
    city: "PORT LOUIS",
    tagline: "A proper online presence.",
    price: "18,000",
    priceLabel: "one-time",
    delivery: "3 business days",
    audience: "Small businesses wanting a complete, custom-designed website.",
    features: [
      "Full one-page site — 5 to 7 sections",
      "Mobile-first custom design",
      "WhatsApp + contact form integration",
      "Google Business Profile setup",
      "Google Analytics 4",
      "Domain (1 year) + hosting (1 year)",
    ],
    bestFor: "Salons, restaurants, fitness coaches, local services, small retail",
    revisions: "2 revision rounds",
    cta: "Start on WhatsApp",
    ctaHref: `${WA}?text=Hi%20bienzoli!%20I%27d%20like%20to%20start%20with%20the%20PORT%20LOUIS%20package.`,
    tone: "lagoon",
    highlighted: false,
  },
  {
    city: "GRAND BAIE",
    tagline: "Grow with credibility.",
    price: "35,000",
    priceLabel: "one-time",
    delivery: "5–7 business days",
    audience: "Growing SMEs that want a premium site and measurable results.",
    features: [
      "Multi-page site — up to 5 pages",
      "Premium custom design",
      "WhatsApp + automated lead notifications",
      "Google Business Profile optimisation",
      "GA4 + monthly report (3 months)",
      "Domain (1 year) + hosting (1 year)",
    ],
    bestFor: "Clinics, real estate agents, retail chains, tourism operators",
    revisions: "3 revision rounds",
    cta: "Request a quote",
    ctaHref: `${WA}?text=Hi%20bienzoli!%20I%27d%20like%20a%20quote%20for%20the%20GRAND%20BAIE%20package.`,
    tone: "lagoon",
    highlighted: true,
  },
  {
    city: "LE MORNE",
    tagline: "Custom-built, no limits.",
    price: "60,000+",
    priceLabel: "custom quote",
    delivery: "2–4 weeks",
    audience: "Businesses needing a custom web application or platform.",
    features: [
      "Custom web app or platform",
      "Fully bespoke design and development",
      "Full local SEO setup",
      "Custom analytics dashboard",
      "Domain (1 year) + hosting (1 year)",
      "Unlimited revisions during project",
    ],
    bestFor: "Enterprises, franchises, hotels, SaaS products, high-volume businesses",
    revisions: "Unlimited during project",
    cta: "Book a consultation",
    ctaHref: `${WA}?text=Hi%20bienzoli!%20I%27d%20like%20to%20book%20a%20consultation%20for%20a%20custom%20project.`,
    tone: "coral",
    highlighted: false,
  },
]

const guaranteeItems = [
  "Mobile-first, responsive design",
  "90+ PageSpeed score",
  "Delivered on time",
  "No hidden costs",
  "WhatsApp-first support",
  "SSL secured",
  "Clean, maintainable code",
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon"
          >
            BIENZOLI — PRICING
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Fast websites built for Mauritius businesses.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-pretty leading-relaxed text-muted-foreground"
          >
            Built in Mauritius. Priced in rupees. Delivered on time.
          </motion.p>
        </div>

        {/* Tier cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-500 ${
                tier.highlighted
                  ? "border-lagoon/40 bg-card glow-lagoon"
                  : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card"
              }`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-px ${
                tier.tone === "coral"
                  ? "bg-gradient-to-r from-transparent via-coral to-transparent"
                  : "bg-gradient-to-r from-transparent via-lagoon to-transparent"
              }`} />

              {/* Most popular badge */}
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-coral px-3 py-1 text-[11px] font-semibold text-white">
                  Most Popular
                </span>
              )}

              {/* City + tagline */}
              <p className={`text-[11px] font-bold tracking-[0.14em] uppercase ${
                tier.tone === "coral" ? "text-coral" : "text-lagoon"
              }`}>
                {tier.city}
              </p>
              <h3 className="mt-1 text-base font-semibold text-foreground">{tier.tagline}</h3>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-sm font-medium text-muted-foreground">Rs</span>
                <span className="text-3xl font-bold tracking-tight text-foreground font-display">
                  {tier.price}
                </span>
              </div>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {tier.priceLabel}
              </p>

              {/* Delivery */}
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                  tier.tone === "coral" ? "bg-coral" : "bg-lagoon"
                }`} />
                <span className="text-xs text-muted-foreground">Delivery: {tier.delivery}</span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{tier.audience}</p>

              {/* Features */}
              <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                      tier.tone === "coral" ? "text-coral" : "text-lagoon"
                    }`} />
                    <span className="text-muted-foreground leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Best for + revisions */}
              <div className="mt-6 border-t border-border/40 pt-4 space-y-1.5">
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground/70">Best for:</span>{" "}
                  {tier.bestFor}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground/70">Revisions:</span>{" "}
                  {tier.revisions}
                </p>
              </div>

              {/* CTA */}
              <Button
                className={`mt-6 w-full rounded-full text-sm font-medium ${
                  tier.highlighted
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-transparent"
                }`}
                variant={tier.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href={tier.ctaHref} target="_blank" rel="noopener noreferrer">
                  {tier.cta}
                </Link>
              </Button>

              {/* LE MORNE custom features note */}
              {tier.city === "LE MORNE" && (
                <p className="mt-3 text-center text-[11px] text-muted-foreground leading-relaxed">
                  AI, automation & CRM — scoped and priced per project.
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 rounded-2xl border border-border/60 bg-card/50 p-7 backdrop-blur-sm"
        >
          <p className="text-xs font-semibold tracking-[0.14em] text-lagoon uppercase">OUR GUARANTEE</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guaranteeItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm">
                <Check className="h-4 w-4 shrink-0 text-lagoon" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Custom features callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-6 max-w-3xl rounded-2xl border border-lagoon/20 bg-lagoon/5 px-8 py-5 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Need AI chatbots, automation, CRM integration, or something custom?{" "}
            <Link
              href={`${WA}?text=Hi%20bienzoli!%20I%20have%20a%20custom%20project%20idea.`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-lagoon underline-offset-4 hover:underline"
            >
              We build those too — let&apos;s talk.
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
