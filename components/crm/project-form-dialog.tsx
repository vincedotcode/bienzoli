"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil } from "lucide-react"
import { saveProjectAction } from "@/app/crm/projects/actions"
import { RichTextEditor } from "./rich-text-editor"
import { useTranslations } from "@/lib/i18n"

type Project = {
  id: number
  title: string
  slug: string
  client_name: string | null
  description: string
  long_description: string | null
  url: string | null
  image_url: string | null
  tags: string[]
  featured: boolean
  sort_order: number
}

export function ProjectFormDialog({ project }: { project?: Project }) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const isEditing = !!project

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" className="gap-2 rounded-full bg-lagoon text-white hover:bg-lagoon/90">
            <Plus className="h-4 w-4" />
            {t.crm.addProject}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl border-border/50">
        <DialogHeader>
          <DialogTitle>{isEditing ? t.crm.editProject : t.crm.newProject}</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await saveProjectAction(formData)
            setOpen(false)
          }}
          className="flex flex-col gap-4"
        >
          {project && <input type="hidden" name="id" value={project.id} />}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">{t.crm.title}</Label>
              <Input id="title" name="title" required defaultValue={project?.title} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">{t.crm.slug}</Label>
              <Input id="slug" name="slug" required defaultValue={project?.slug} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="client_name">{t.crm.clientName}</Label>
              <Input id="client_name" name="client_name" defaultValue={project?.client_name || ""} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">{t.crm.url}</Label>
              <Input id="url" name="url" type="url" defaultValue={project?.url || ""} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t.crm.shortDesc}</Label>
            <RichTextEditor
              name="description"
              defaultValue={project?.description || ""}
              placeholder={t.crm.briefPlaceholder}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t.crm.detailedDesc}</Label>
            <RichTextEditor
              name="long_description"
              defaultValue={project?.long_description || ""}
              placeholder={t.crm.detailPlaceholder}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image_url">{t.crm.imageUrl}</Label>
            <Input id="image_url" name="image_url" defaultValue={project?.image_url || ""} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tags">{t.crm.tags}</Label>
            <Input id="tags" name="tags" defaultValue={project?.tags.join(", ") || ""} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="sort_order">{t.crm.sortOrder}</Label>
              <Input id="sort_order" name="sort_order" type="number" defaultValue={project?.sort_order || 0} />
            </div>
            <div className="flex items-end gap-2 pb-1">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                defaultChecked={project?.featured ?? true}
                className="h-4 w-4 rounded border-border accent-lagoon"
              />
              <Label htmlFor="featured">{t.crm.featured}</Label>
            </div>
          </div>

          <Button type="submit" className="mt-2 rounded-full bg-lagoon text-white hover:bg-lagoon/90">
            {isEditing ? t.crm.saveChanges : t.crm.createProject}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
