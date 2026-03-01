"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Project = {
  slug: string
  clientName: string
  industry: string
  location: string
  description: string
  url: string
  featured?: boolean
  result?: string
}

const projects: Project[] = [
  {
    slug: "frisco",
    clientName: "Frisco Creamery",
    industry: "Food & Hospitality",
    location: "United States",
    description:
      "Full brand website for a premium ice cream creamery — vibrant product showcase, location finder, and an order flow that converts browsers into loyal regulars.",
    url: "https://friscocreamery.org",
    featured: true,
    result: "Conversion-led design for a premium food brand",
  },
  {
    slug: "nickelsew",
    clientName: "Nickel Sew",
    industry: "Tailoring & Upholstery",
    location: "Chamouny, Mauritius",
    description:
      "Before/after gallery, WhatsApp booking flow, loyalty programme and sustainability story.",
    url: "https://nickelsew.com",
  },
  {
    slug: "ziyaad",
    clientName: "Ziyaad Ben Eydatoula",
    industry: "Product Management Consulting",
    location: "International",
    description:
      "Personal brand site with problem-framing sections, testimonials and service tabs.",
    url: "https://ziyaadbeneydatoula.com",
  },
  {
    slug: "keygo",
    clientName: "KeyGo",
    industry: "Car Rental Platform",
    location: "Mauritius",
    description:
      "Fleet display, Mauritian payment methods, full booking flow and trust-building testimonials.",
    url: "https://keygomu.vercel.app",
  },
]

export function PortfolioSection() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] radial-glow-lagoon opacity-40" />
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon"
          >
            OUR WORK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Sites we&apos;ve built and shipped.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-pretty leading-relaxed text-muted-foreground"
          >
            Real businesses. Live sites. Delivered on time.
          </motion.p>
        </div>

        {/* Featured project — Frisco Creamery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 group relative overflow-hidden rounded-2xl border border-lagoon/30 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-lagoon/50 hover:bg-card"
        >
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lagoon/60 to-transparent" />

          {/* Featured badge */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-1.5 rounded-full bg-lagoon px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-lagoon/20">
            <Star className="h-3 w-3 fill-white" />
            LATEST WORK
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Screenshot side */}
            <Link
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block overflow-hidden"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                </div>
                <div className="ml-2 flex-1 rounded-md bg-background/60 px-3 py-1 text-[11px] font-mono text-muted-foreground">
                  friscocreamery.org
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20">
                <Image
                  src="/portfolio/frisco-desktop.png"
                  alt="Frisco Creamery website screenshot"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Link>

            {/* Info side */}
            <div className="flex flex-col justify-between p-8 lg:p-10">
              <div>
                <p className="text-xs font-bold font-display tracking-[0.14em] uppercase text-lagoon">
                  {featured.industry} · {featured.location}
                </p>
                <h3 className="mt-3 text-2xl font-bold font-display tracking-tight text-foreground group-hover:text-lagoon transition-colors duration-300">
                  {featured.clientName}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>

                {featured.result && (
                  <div className="mt-6 flex items-center gap-2 rounded-xl border border-lagoon/20 bg-lagoon/5 px-4 py-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-lagoon shrink-0" />
                    <p className="text-xs font-medium text-lagoon">{featured.result}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Next.js", "Tailwind CSS", "Framer Motion", "SEO"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="group/btn bg-lagoon text-white hover:bg-lagoon/90 gap-2 rounded-full px-6 font-medium"
                  asChild
                >
                  <Link href="/contact">
                    Get a site like this
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 rounded-full border-border/60 bg-transparent hover:bg-muted/50"
                  asChild
                >
                  <Link href={featured.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View live site
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-lagoon/0 to-transparent transition-all duration-500 group-hover:via-lagoon/40" />
        </motion.div>

        {/* Rest of projects */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-lagoon/30 hover:bg-card"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                </div>
                <div className="ml-2 flex-1 rounded-md bg-background/60 px-3 py-1 text-[11px] font-mono text-muted-foreground truncate">
                  {project.url.replace("https://", "")}
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Screenshot */}
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[16/9] w-full overflow-hidden bg-muted/20"
              >
                <Image
                  src={`/portfolio/${project.slug}-desktop.png`}
                  alt={`${project.clientName} website screenshot`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>

              {/* Card footer */}
              <div className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-lagoon transition-colors duration-300">
                      {project.clientName}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {project.industry} · {project.location}
                    </p>
                  </div>
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg border border-border/60 bg-muted/30 p-1.5 text-muted-foreground transition-colors hover:border-lagoon/40 hover:text-lagoon"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-lagoon/0 to-transparent transition-all duration-500 group-hover:via-lagoon/50" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Want results like these for your business?
          </p>
          <Button
            size="lg"
            className="mt-4 bg-lagoon text-white hover:bg-lagoon/90 gap-2 rounded-full px-8 font-medium"
            asChild
          >
            <Link href="/contact">
              Start your project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
