"use client"

import { useTranslations } from "@/lib/i18n"
import type { KPIData } from "@/lib/crm-queries"
import { Users, UserPlus, CheckCircle2, TrendingUp } from "lucide-react"

function formatRs(value: number): string {
  return `Rs ${value.toLocaleString("en-MU")}`
}

export function KPICards({ data }: { data: KPIData }) {
  const t = useTranslations()

  const kpis = [
    { key: "total_leads" as const, label: t.crm.totalLeads, icon: Users, format: (v: number) => String(v) },
    { key: "new_this_week" as const, label: t.crm.newThisWeek, icon: UserPlus, format: (v: number) => String(v) },
    { key: "qualified" as const, label: t.crm.qualified, icon: CheckCircle2, format: (v: number) => String(v) },
    { key: "won_value" as const, label: t.crm.wonValue, icon: TrendingUp, format: formatRs },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <div key={kpi.key} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{kpi.label}</span>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {kpi.format(data[kpi.key])}
          </p>
        </div>
      ))}
    </div>
  )
}
