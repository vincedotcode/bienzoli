"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n"

export function Footer() {
  const t = useTranslations()

  const footerLinks = {
    [t.footer.services]: [
      { label: t.footer.websites, href: "#features" },
      { label: t.footer.landingPages, href: "#features" },
      { label: t.footer.ecommerce, href: "#pricing" },
      { label: t.footer.seo, href: "#features" },
      { label: t.footer.aiTools, href: "#ai" },
    ],
    [t.footer.company]: [
      { label: t.footer.about, href: "#" },
      { label: t.footer.contactUs, href: "/contact" },
      { label: t.footer.blog, href: "#" },
    ],
    [t.footer.legal]: [
      { label: t.footer.privacy, href: "#" },
      { label: t.footer.terms, href: "#" },
      { label: t.footer.cookies, href: "#" },
    ],
  }

  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-lagoon/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo_normal_transparent.png" alt="bienzoli logo" width={32} height={32} className="h-7 w-auto" />
              <span className="text-lg font-semibold tracking-[0.03em] text-foreground lowercase">bienzoli</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{category}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">{`\u00A9 ${new Date().getFullYear()} bienzoli. ${t.footer.rights}`}</p>
          <p className="text-xs text-muted-foreground">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  )
}
