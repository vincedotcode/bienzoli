import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { PortfolioSection } from "@/components/portfolio-section"
import { Pricing } from "@/components/pricing"
import { MaintenanceSection } from "@/components/maintenance-section"
import { FAQ } from "@/components/faq"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <PortfolioSection />
        <Pricing />
        <MaintenanceSection />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
