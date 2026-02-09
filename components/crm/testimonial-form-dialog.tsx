"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil } from "lucide-react"
import { saveTestimonialAction } from "@/app/crm/testimonials/actions"
import { RichTextEditor } from "./rich-text-editor"
import { useTranslations } from "@/lib/i18n"

type Testimonial = {
  id: number
  name: string
  company: string | null
  role: string | null
  quote: string
  rating: number
  avatar_url: string | null
  featured: boolean
  sort_order: number
}

export function TestimonialFormDialog({ testimonial }: { testimonial?: Testimonial }) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const isEditing = !!testimonial

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90 rounded-full">
            <Plus className="h-4 w-4" />
            {t.crm.addTestimonial}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? t.crm.editTestimonial : t.crm.newTestimonial}
          </DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await saveTestimonialAction(formData)
            setOpen(false)
          }}
          className="flex flex-col gap-4"
        >
          {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm text-foreground">{t.crm.name}</Label>
            <Input id="name" name="name" required defaultValue={testimonial?.name} className="bg-background border-border/50" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company" className="text-sm text-foreground">{t.crm.company}</Label>
              <Input id="company" name="company" defaultValue={testimonial?.company || ""} className="bg-background border-border/50" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="text-sm text-foreground">{t.crm.role}</Label>
              <Input id="role" name="role" defaultValue={testimonial?.role || ""} className="bg-background border-border/50" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-foreground">{t.crm.quote}</Label>
            <RichTextEditor
              name="quote"
              defaultValue={testimonial?.quote || ""}
              placeholder={t.crm.quotePlaceholder}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="rating" className="text-sm text-foreground">{t.crm.rating}</Label>
              <Input id="rating" name="rating" type="number" min={1} max={5} defaultValue={testimonial?.rating || 5} className="bg-background border-border/50" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="sort_order" className="text-sm text-foreground">{t.crm.sortOrder}</Label>
              <Input id="sort_order" name="sort_order" type="number" defaultValue={testimonial?.sort_order || 0} className="bg-background border-border/50" />
            </div>
            <div className="flex items-end gap-2 pb-1">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                defaultChecked={testimonial?.featured ?? true}
                className="h-4 w-4 rounded border-border"
              />
              <Label htmlFor="featured" className="text-sm text-foreground">{t.crm.featured}</Label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar_url" className="text-sm text-foreground">{t.crm.avatarUrl}</Label>
            <Input id="avatar_url" name="avatar_url" defaultValue={testimonial?.avatar_url || ""} className="bg-background border-border/50" />
          </div>

          <Button type="submit" className="mt-2 bg-foreground text-background hover:bg-foreground/90 rounded-full">
            {isEditing ? t.crm.saveChanges : t.crm.createTestimonial}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
