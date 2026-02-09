import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Pricing — bienzoli",
  description:
    "Transparent pricing for premium web development. All prices in Mauritian Rupees. No hidden fees.",
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
