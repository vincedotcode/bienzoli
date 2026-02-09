import React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "@/components/locale-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: {
    default: "bienzoli | Premium Web Development & AI Solutions from Mauritius",
    template: "%s | bienzoli",
  },
  description:
    "Get your complete websuite -- website, CRM, and AI tools -- live in just 48 hours. Premium web development, marketing, and AI integration from Mauritius. Start tracking leads and growing your business from day one.",
  keywords: [
    "web development Mauritius",
    "website design Mauritius",
    "AI web development",
    "CRM Mauritius",
    "landing page Mauritius",
    "SEO Mauritius",
    "bienzoli",
    "developpement web Maurice",
    "agence web Maurice",
    "WhatsApp business Mauritius",
    "e-commerce Mauritius",
    "web agency Indian Ocean",
    "48 hour website",
  ],
  authors: [{ name: "bienzoli", url: "https://bienzoli.com" }],
  creator: "bienzoli",
  publisher: "bienzoli",
  metadataBase: new URL("https://bienzoli.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/?lang=fr",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_MU",
    alternateLocale: ["fr_MU"],
    url: "https://bienzoli.com",
    siteName: "bienzoli",
    title: "bienzoli | Premium Web Development & AI from Mauritius",
    description:
      "Get your complete websuite live in 48 hours. Website, CRM, and AI tools -- built for Mauritian businesses.",
    images: [
      {
        url: "/logo_normal_whiteback.png",
        width: 1200,
        height: 630,
        alt: "bienzoli - Premium Web Development from Mauritius",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "bienzoli | Web Development & AI from Mauritius",
    description:
      "Get your complete websuite live in 48 hours. Website, CRM, and AI tools.",
    images: ["/logo_normal_whiteback.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d12" },
  ],
  width: "device-width",
  initialScale: 1,
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "bienzoli",
  description:
    "Premium web development, marketing, and AI solutions from Mauritius. Complete websuite delivery in 48 hours.",
  url: "https://bienzoli.com",
  logo: "https://bienzoli.com/logo_normal_whiteback.png",
  image: "https://bienzoli.com/logo_normal_whiteback.png",
  telephone: "+230-5XXX-XXXX",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MU",
    addressRegion: "Mauritius",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-20.1609",
    longitude: "57.5012",
  },
  areaServed: [
    { "@type": "Country", name: "Mauritius" },
    { "@type": "Place", name: "Indian Ocean Region" },
  ],
  priceRange: "Rs 14,900 - Rs 74,900",
  knowsLanguage: ["en", "fr", "mfe"],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Starter Plan",
        description: "Landing page, WhatsApp integration, basic SEO, 3 months support",
        price: "14900",
        priceCurrency: "MUR",
      },
      {
        "@type": "Offer",
        name: "Growth Plan",
        description: "Multi-page website, CRM, AI chatbot, Google Analytics, 6 months support",
        price: "34900",
        priceCurrency: "MUR",
      },
      {
        "@type": "Offer",
        name: "Scale Plan",
        description: "Full-suite website, AI lead scoring, content generation, e-commerce, 12 months support",
        price: "74900",
        priceCurrency: "MUR",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>
            {children}
            <Toaster />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
