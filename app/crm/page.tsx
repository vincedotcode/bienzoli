import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { getKPIs, getLeads } from "@/lib/crm-queries"
import { KPICards } from "@/components/crm/kpi-cards"
import { LeadTable } from "@/components/crm/lead-table"
import { CRMFilters } from "@/components/crm/crm-filters"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "CRM Dashboard — bienzoli",
  description: "Manage leads and track your pipeline.",
}

export const dynamic = "force-dynamic"

async function DashboardContent({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; sort?: string }>
}) {
  const params = await searchParams
  const [kpis, leads] = await Promise.all([
    getKPIs(),
    getLeads(params.search, params.status, params.sort),
  ])

  return (
    <>
      <KPICards data={kpis} />
      <div className="mt-8 space-y-4">
        <Suspense>
          <CRMFilters />
        </Suspense>
        <LeadTable leads={leads} />
      </div>
    </>
  )
}

export default function CRMPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; sort?: string }>
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* CRM header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo_normal_transparent.png"
                alt="bienzoli logo"
                width={28}
                height={28}
                className="h-6 w-auto"
              />
              <span className="text-base font-semibold tracking-[0.03em] text-foreground lowercase">
                bienzoli
              </span>
            </Link>
            <span className="text-border">/</span>
            <span className="text-sm font-medium text-foreground">CRM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/crm/projects"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="/crm/testimonials"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage your leads pipeline.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={`kpi-skeleton-${i}`} className="h-24 rounded-xl" />
                ))}
              </div>
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-96 rounded-xl" />
            </div>
          }
        >
          <DashboardContent searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  )
}
