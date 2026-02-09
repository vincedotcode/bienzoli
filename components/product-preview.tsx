"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ProductPreview() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 radial-glow-lagoon opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden p-1"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 rounded-t-xl border-b border-border/50 bg-muted/50 px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            </div>
            <div className="ml-3 flex-1 rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground font-mono">
              your-business.mu
            </div>
          </div>
          {/* CRM preview illustration */}
          <div className="relative h-64 sm:h-80 lg:h-96 bg-background/50">
            <Image
              src="/illustrations/mauritian-team.jpg"
              alt="CRM Dashboard Preview"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Live CRM Dashboard</p>
                <p className="mt-1 text-lg font-bold text-foreground">Track every lead from day one</p>
              </div>
              <div className="flex gap-3">
                <div className="rounded-lg border border-border/50 bg-card/80 px-3 py-2 backdrop-blur-sm">
                  <div className="text-lg font-bold text-lagoon">127</div>
                  <div className="text-[10px] text-muted-foreground">Leads</div>
                </div>
                <div className="rounded-lg border border-border/50 bg-card/80 px-3 py-2 backdrop-blur-sm">
                  <div className="text-lg font-bold text-coral">89%</div>
                  <div className="text-[10px] text-muted-foreground">Response</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
