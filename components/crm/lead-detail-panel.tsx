"use client"

import { useEffect, useState, useTransition } from "react"
import useSWR from "swr"
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { changeLeadStatus, createNote } from "@/app/crm/actions"
import { toast } from "sonner"
import {
  Mail, Phone, MessageCircle, Building2, Clock, FileText, RefreshCw, Loader2,
} from "lucide-react"
import { useTranslations } from "@/lib/i18n"

type LeadDetail = {
  id: number
  name: string
  company: string | null
  email: string
  phone: string | null
  whatsapp: string | null
  monthly_ad_budget: string | null
  service_needed: string | null
  message: string | null
  source: string | null
  status: string
  won_value: number
  created_at: string
}

type Activity = {
  id: number
  type: string
  content: string | null
  created_at: string
}

const statusStyles: Record<string, string> = {
  new: "bg-muted text-muted-foreground",
  contacted: "bg-coral/10 text-coral",
  qualified: "bg-lagoon/10 text-lagoon",
  won: "bg-emerald-500/10 text-emerald-600",
  lost: "bg-destructive/10 text-destructive",
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-MU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function LeadDetailPanel({
  leadId,
  open,
  onClose,
}: {
  leadId: number | null
  open: boolean
  onClose: () => void
}) {
  const t = useTranslations()
  const { data, mutate } = useSWR<{ lead: LeadDetail; activities: Activity[] }>(
    leadId ? `/api/crm/leads/${leadId}` : null,
    fetcher
  )

  const [note, setNote] = useState("")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setNote("")
  }, [leadId])

  const lead = data?.lead
  const activities = data?.activities || []

  const statusLabels: Record<string, string> = {
    new: t.crm.statusNew,
    contacted: t.crm.statusContacted,
    qualified: t.crm.statusQualified,
    won: t.crm.statusWon,
    lost: t.crm.statusLost,
  }

  const statuses = ["new", "contacted", "qualified", "won", "lost"]

  async function handleStatusChange(newStatus: string) {
    if (!lead) return
    const fd = new FormData()
    fd.set("id", String(lead.id))
    fd.set("status", newStatus)
    startTransition(async () => {
      await changeLeadStatus(fd)
      mutate()
      toast.success(`${t.crm.statusUpdated} ${statusLabels[newStatus] || newStatus}`)
    })
  }

  async function handleAddNote() {
    if (!lead || !note.trim()) return
    const fd = new FormData()
    fd.set("leadId", String(lead.id))
    fd.set("content", note)
    startTransition(async () => {
      await createNote(fd)
      setNote("")
      mutate()
      toast.success(t.crm.noteAdded)
    })
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{lead?.name || t.crm.leadDetails}</SheetTitle>
        </SheetHeader>

        {!lead ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Contact info */}
            <div className="space-y-3">
              {lead.company && (
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{lead.company}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-lagoon hover:underline">{lead.email}</a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{lead.phone}</span>
                </div>
              )}
              {lead.whatsapp && (
                <div className="flex items-center gap-3 text-sm">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://wa.me/${lead.whatsapp.replace(/[^0-9+]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lagoon hover:underline"
                  >
                    {lead.whatsapp}
                  </a>
                </div>
              )}
            </div>

            <Separator />

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">{t.crm.status}</Label>
              <div className="flex items-center gap-3">
                <Select value={lead.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {statusLabels[s] || s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="secondary" className={`capitalize ${statusStyles[lead.status] || ""}`}>
                  {statusLabels[lead.status] || lead.status}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              {lead.service_needed && (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t.crm.service}: </span>
                  <span className="text-foreground">{lead.service_needed}</span>
                </div>
              )}
              {lead.monthly_ad_budget && (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t.crm.budget}: </span>
                  <span className="text-foreground">{lead.monthly_ad_budget}</span>
                </div>
              )}
              {lead.source && (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t.crm.source}: </span>
                  <span className="capitalize text-foreground">{lead.source}</span>
                </div>
              )}
              {lead.message && (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t.crm.message}: </span>
                  <span className="text-foreground">{lead.message}</span>
                </div>
              )}
            </div>

            <Separator />

            {/* Add note */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">{t.crm.addNote}</Label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t.crm.notePlaceholder}
                rows={3}
              />
              <Button
                size="sm"
                disabled={isPending || !note.trim()}
                onClick={handleAddNote}
                className="bg-lagoon text-primary-foreground hover:bg-lagoon/90"
              >
                {isPending ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : null}
                {t.crm.addNote}
              </Button>
            </div>

            <Separator />

            {/* Activity timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground">{t.crm.activityTimeline}</Label>
                <Button variant="ghost" size="sm" onClick={() => mutate()} className="h-7 px-2">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>

              {activities.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t.crm.noActivity}</p>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-3 border-l-2 border-border pl-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {activity.type === "note" ? (
                            <FileText className="h-3.5 w-3.5 text-lagoon" />
                          ) : (
                            <RefreshCw className="h-3.5 w-3.5 text-coral" />
                          )}
                          <span className="text-xs font-medium capitalize text-muted-foreground">
                            {activity.type.replace("_", " ")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-foreground">{activity.content}</p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDate(activity.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
