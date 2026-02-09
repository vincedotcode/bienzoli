"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import { useTranslations, localeFlags, type Locale } from "@/lib/i18n"
import { useLocale } from "@/components/locale-provider"
import { useTheme } from "next-themes"

const locales: Locale[] = ["en", "fr", "mrc"]

export function Navbar() {
  const t = useTranslations()
  const { locale, setLocale } = useLocale()
  const { resolvedTheme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { label: t.nav.services, href: "#features" },
    { label: t.nav.work, href: "#projects" },
    { label: t.nav.ai, href: "#ai" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.contact, href: "/contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo_normal_transparent.png"
            alt="bienzoli logo"
            width={36}
            height={36}
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold tracking-[0.03em] text-foreground lowercase">
            bienzoli
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Locale Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              {localeFlags[locale]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 min-w-[120px] overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg"
                >
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false) }}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
                        locale === l
                          ? "bg-accent text-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-[10px] w-5">{localeFlags[l]}</span>
                      <span>{l === "en" ? "English" : l === "fr" ? "Francais" : "Kreol"}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="relative flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}

          <Button
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 text-[13px] font-medium"
            asChild
          >
            <Link href="/contact">{t.nav.getStarted}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border/40">
                <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/50 p-0.5">
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLocale(l)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                        locale === l ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      {localeFlags[l]}
                    </button>
                  ))}
                </div>
                {mounted && (
                  <button
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="rounded-lg border border-border bg-muted/50 p-2 text-muted-foreground"
                    aria-label="Toggle theme"
                  >
                    {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                )}
                <Button size="sm" className="ml-auto bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>{t.nav.getStarted}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
