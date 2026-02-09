"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Pricing() {
  const tiers = [
    {
      city: "PORT LOUIS",
      name: "Start smart. Capture every lead.",
      price: "Rs 15,000",
      priceLabel: "One-time",
      audience:
        "For small businesses that want a modern online presence and zero lead loss.",
      features: [
        "Modern one-page website",
        "Fast, mobile-first, high-conversion layout",
        "Domain name included (1 year)",
        "WhatsApp integration",
        "Instant customer contact",
        "Smart contact form",
        "Captures every enquiry automatically",
        "Built-in CRM system",
        "Centralized customer database",
        "Lead management dashboard",
        "Track enquiries and follow-ups",
        "Customer data ownership",
        "Your data, no subscriptions",
      ],
      impact: [
        "Reduce manual work",
        "Never lose customer enquiries",
        "Respond faster and close more deals",
        "Build a real customer database from day one",
      ],
      bestFor:
        "Freelancers, salons, restaurants, startups, local services",
      cta: "Get started on WhatsApp",
      ctaHref:
        "https://wa.me/23057901383?text=Hi%20BIENZOLI,%20I%20want%20to%20start%20with%20the%20PORT%20LOUIS%20package.",
      tone: "lagoon",
      highlighted: false,
    },
    {
      city: "GRAND BAIE",
      name: "Grow with confidence. Look professional. Scale faster.",
      price: "Rs 25,000",
      priceLabel: "One-time",
      audience:
        "For growing businesses that want credibility, automation, and higher conversions.",
      features: [
        "Everything in PORT LOUIS",
        "Full multi-page website",
        "Home, About, Services, Contact",
        "Premium modern design",
        "Built to build trust instantly",
        "Professional business email",
        "contact@yourbusiness.mu",
        "CRM system (1 user)",
        "Organized lead and customer management",
        "Email notifications",
        "Never miss a new enquiry",
        "Enhanced WhatsApp integration",
        "Faster follow-ups",
        "Secure customer database",
      ],
      impact: [
        "Higher trust and higher conversion rates",
        "Better follow-ups and repeat customers",
        "Reduced admin cost",
        "Clear visibility on leads and enquiries",
      ],
      bestFor:
        "SMEs, clinics, real estate, retail, service companies",
      cta: "Request a quote on WhatsApp",
      ctaHref:
        "https://wa.me/23057901383?text=Hi%20BIENZOLI,%20I%20want%20a%20quote%20for%20the%20GRAND%20BAIE%20package.",
      tone: "coral",
      highlighted: true,
    },
    {
      city: "LE MORNE",
      name: "Enterprise-grade systems for serious businesses.",
      price: "Custom pricing",
      priceLabel: "",
      audience:
        "For businesses that want automation, scalability, and long-term growth systems.",
      features: [
        "Custom website or web application",
        "Advanced CRM system",
        "Multiple pipelines",
        "Customer segmentation",
        "Automation workflows",
        "Lead assignment",
        "Follow-up reminders",
        "Multi-user access",
        "WhatsApp and email automation",
        "Analytics and reporting",
        "See what brings revenue",
        "Custom integrations",
        "Tailored to your business",
        "Priority support",
      ],
      impact: [
        "Systemized operations",
        "Reduced staffing costs",
        "Predictable lead handling",
        "Scalable infrastructure",
      ],
      bestFor:
        "Enterprises, franchises, high-volume businesses",
      cta: "Book a consultation",
      ctaHref:
        "https://wa.me/23057901383?text=Hi%20BIENZOLI,%20I%20want%20to%20book%20a%20consultation%20for%20LE%20MORNE.",
      tone: "emerald",
      highlighted: false,
    },
  ]

  const guaranteeItems = [
    "Modern and future-proof",
    "Mobile-first",
    "Secure",
    "Built to convert leads",
    "Delivered on time",
    "No hidden costs",
    "WhatsApp-first support",
  ]

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon">
            BIENZOLI - PRICING
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Modern websites with built-in CRM systems
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Built in Mauritius. Priced in rupees. Guaranteed delivery.
          </motion.p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-500 ${
                tier.highlighted ? "border-lagoon/40 bg-card glow-lagoon" : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card"
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-px ${
                tier.tone === "lagoon"
                  ? "bg-gradient-to-r from-transparent via-lagoon to-transparent"
                  : tier.tone === "coral"
                    ? "bg-gradient-to-r from-transparent via-coral to-transparent"
                    : "bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              }`} />
              {tier.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-coral px-3 py-1 text-[11px] font-semibold text-white">
                  Most Popular
                </span>
              )}

              <p className={`text-xs font-semibold tracking-[0.14em] ${
                tier.tone === "lagoon" ? "text-lagoon" : tier.tone === "coral" ? "text-coral" : "text-emerald-400"
              }`}>{tier.city}</p>
              <h3 className="mt-2 text-balance text-lg font-semibold text-foreground">{tier.name}</h3>
              <div className="mt-5">
                <span className="text-4xl font-bold tracking-tight text-foreground">{tier.price}</span>
                {tier.priceLabel && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    {tier.priceLabel}
                  </p>
                )}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{tier.audience}</p>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground/80">
                  What&apos;s included
                </p>
              </div>
              <ul className="mt-3 flex flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground/80">
                  Business impact
                </p>
              </div>
              <ul className="mt-3 flex flex-col gap-2.5">
                {tier.impact.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground/80">Best for:</span> {tier.bestFor}
              </p>

              <Button
                className={`mt-8 w-full rounded-full font-medium ${tier.highlighted ? "bg-foreground text-background hover:bg-foreground/90" : "bg-transparent"}`}
                variant={tier.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href={tier.ctaHref} target="_blank" rel="noopener noreferrer">
                  {tier.cta}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm"
        >
          <p className="text-xs font-semibold tracking-[0.14em] text-lagoon">OUR GUARANTEE</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guaranteeItems.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border/60 bg-muted/20 p-7 text-center"
        >
          <p className="text-lg font-medium tracking-tight text-foreground">
            We don&apos;t just build websites.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We build systems that capture leads, retain customers, and increase profits.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
