"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

type Project = {
  id: number
  title: string
  slug: string
  client_name: string | null
  description: string
  url: string | null
  tags: string[]
  featured: boolean
  sort_order: number
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations()

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] radial-glow-lagoon opacity-40" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon">
            {t.projects.badge}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.projects.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.projects.subtitle}
          </motion.p>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.a
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              href={project.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-lagoon/30 hover:bg-card"
            >
              <div className="flex items-center gap-2 border-b border-border/50 px-5 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-muted/50 px-3 py-1 text-[11px] text-muted-foreground font-mono">
                  {project.url?.replace("https://", "").replace("http://", "") || project.slug}
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-lagoon transition-colors duration-300">{project.title}</h3>
                  {project.client_name && <p className="mt-0.5 text-xs text-muted-foreground">{project.client_name}</p>}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-lagoon/0 to-transparent transition-all duration-500 group-hover:via-lagoon/50" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
