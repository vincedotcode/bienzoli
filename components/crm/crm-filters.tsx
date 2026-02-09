"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Search } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { useTranslations } from "@/lib/i18n"

export function CRMFilters() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") ?? "")
  const [isPending, startTransition] = useTransition()

  const statuses = [
    { value: "all", label: t.crm.allStatuses },
    { value: "new", label: t.crm.statusNew },
    { value: "contacted", label: t.crm.statusContacted },
    { value: "qualified", label: t.crm.statusQualified },
    { value: "won", label: t.crm.statusWon },
    { value: "lost", label: t.crm.statusLost },
  ]

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    startTransition(() => {
      router.push(`/crm?${params.toString()}`)
    })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    updateParams("search", search)
  }

  async function handleExport() {
    try {
      const res = await fetch("/api/crm/export")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `bienzoli-leads-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
      toast.success(t.crm.csvExported)
    } catch {
      toast.error(t.crm.csvFailed)
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.crm.searchLeads}
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="outline" size="sm" className="shrink-0 bg-transparent">
          {t.crm.search}
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <Select
          defaultValue={searchParams.get("status") ?? "all"}
          onValueChange={(v) => updateParams("status", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={handleExport} className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">{t.crm.exportCsv}</span>
        </Button>
      </div>
    </div>
  )
}
