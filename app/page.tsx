import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { AISection } from "@/components/ai-section"
import { HowItWorks } from "@/components/how-it-works"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { ProductPreview } from "@/components/product-preview"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"

function SectionSkeleton() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-6 w-24 animate-pulse rounded-full bg-muted/50" />
          <div className="mx-auto mt-4 h-10 w-96 animate-pulse rounded-lg bg-muted/30" />
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl bg-muted/20" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AISection />
        <HowItWorks />
        <Suspense fallback={<SectionSkeleton />}>
           {/* <ProjectsShowcase /> */}
        </Suspense>
         <ProductPreview /> 
        <Suspense fallback={<SectionSkeleton />}>
          {/* <Testimonials /> */}
        </Suspense>
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
