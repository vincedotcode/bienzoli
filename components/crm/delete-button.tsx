"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

export function DeleteButton({
  id,
  action,
  label,
}: {
  id: number
  action: (formData: FormData) => Promise<void>
  label: string
}) {
  const t = useTranslations()
  const [loading, setLoading] = useState(false)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card border-border/50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            {t.crm.deleteTitle} {label}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t.crm.deleteConfirm} {label}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent">{t.crm.cancel}</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={async () => {
              setLoading(true)
              const formData = new FormData()
              formData.append("id", String(id))
              await action(formData)
              setLoading(false)
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? t.crm.deleting : t.crm.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
