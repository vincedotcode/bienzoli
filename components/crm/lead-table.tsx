"use client"

import { useState } from "react"
import type { Lead } from "@/lib/crm-queries"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { LeadDetailPanel } from "./lead-detail-panel"
import { useTranslations } from "@/lib/i18n"

const statusStyles: Record<string, string> = {
  new: "bg-muted text-muted-foreground",
  contacted: "bg-coral/10 text-coral",
  qualified: "bg-lagoon/10 text-lagoon",
  won: "bg-emerald-500/10 text-emerald-600",
  lost: "bg-destructive/10 text-destructive",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function LeadTable({ leads }: { leads: Lead[] }) {
  const t = useTranslations()
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null)

  const statusLabels: Record<string, string> = {
    new: t.crm.statusNew,
    contacted: t.crm.statusContacted,
    qualified: t.crm.statusQualified,
    won: t.crm.statusWon,
    lost: t.crm.statusLost,
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.crm.name}</TableHead>
              <TableHead className="hidden sm:table-cell">{t.crm.company}</TableHead>
              <TableHead className="hidden md:table-cell">{t.crm.service}</TableHead>
              <TableHead className="hidden lg:table-cell">{t.crm.source}</TableHead>
              <TableHead>{t.crm.status}</TableHead>
              <TableHead className="hidden sm:table-cell">{t.crm.date}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  {t.crm.noLeads}
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => setSelectedLeadId(lead.id)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{lead.company}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {lead.company || "\u2014"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {lead.service_needed || "\u2014"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="capitalize text-muted-foreground">{lead.source || "\u2014"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`capitalize ${statusStyles[lead.status] || ""}`}>
                      {statusLabels[lead.status] || lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                    {formatDate(lead.created_at)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <LeadDetailPanel
        leadId={selectedLeadId}
        open={selectedLeadId !== null}
        onClose={() => setSelectedLeadId(null)}
      />
    </>
  )
}
