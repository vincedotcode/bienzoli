"use client"

import { useActionState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { submitContact, type ContactFormState } from "@/app/contact/actions"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

const initialState: ContactFormState = { success: false }

export function ContactForm() {
  const t = useTranslations()
  const [state, formAction, isPending] = useActionState(submitContact, initialState)
  const searchParams = useSearchParams()

  const services = [
    t.contact.serviceOptions.s1,
    t.contact.serviceOptions.s2,
    t.contact.serviceOptions.s3,
    t.contact.serviceOptions.s4,
    t.contact.serviceOptions.s5,
    t.contact.serviceOptions.s6,
  ]

  const budgets = [
    t.contact.budgetOptions.b1,
    t.contact.budgetOptions.b2,
    t.contact.budgetOptions.b3,
    t.contact.budgetOptions.b4,
  ]

  useEffect(() => {
    if (state.success) {
      toast.success(t.contact.success)
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state, t.contact.success])

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lagoon/10">
          <CheckCircle2 className="h-8 w-8 text-lagoon" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-foreground">
          {t.contact.success}
        </h3>
      </motion.div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden UTM fields */}
      <input type="hidden" name="utmSource" value={searchParams.get("utm_source") ?? ""} />
      <input type="hidden" name="utmMedium" value={searchParams.get("utm_medium") ?? ""} />
      <input type="hidden" name="utmCampaign" value={searchParams.get("utm_campaign") ?? ""} />
      <input type="hidden" name="utmTerm" value={searchParams.get("utm_term") ?? ""} />
      <input type="hidden" name="utmContent" value={searchParams.get("utm_content") ?? ""} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            {t.contact.name} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            placeholder={t.contact.name}
            required
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="text-xs text-destructive">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">{t.contact.company}</Label>
          <Input id="company" name="company" placeholder={t.contact.company} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">
            {t.contact.email} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="text-xs text-destructive">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t.contact.phone}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+230 5XXX XXXX"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="whatsapp">{t.contact.whatsapp}</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            placeholder="+230 5XXX XXXX"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyAdBudget">{t.contact.budget}</Label>
          <Select name="monthlyAdBudget">
            <SelectTrigger id="monthlyAdBudget">
              <SelectValue placeholder={t.contact.budget} />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceNeeded">
          {t.contact.service} <span className="text-destructive">*</span>
        </Label>
        <Select name="serviceNeeded" required>
          <SelectTrigger id="serviceNeeded">
            <SelectValue placeholder={t.contact.service} />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.fieldErrors?.serviceNeeded && (
          <p className="text-xs text-destructive">
            {state.fieldErrors.serviceNeeded[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          {t.contact.message} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t.contact.message}
          rows={5}
          required
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="text-xs text-destructive">
            {state.fieldErrors.message[0]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full bg-lagoon text-primary-foreground hover:bg-lagoon/90 rounded-full font-medium"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.contact.sending}
          </>
        ) : (
          t.contact.submit
        )}
      </Button>
    </form>
  )
}
