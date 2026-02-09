"use server"

import { revalidatePath } from "next/cache"
import { upsertProject, deleteProject } from "@/lib/crm-queries"

export async function saveProjectAction(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const client_name = formData.get("client_name") as string
  const description = formData.get("description") as string
  const long_description = formData.get("long_description") as string
  const url = formData.get("url") as string
  const image_url = formData.get("image_url") as string
  const tagsRaw = formData.get("tags") as string
  const featured = formData.get("featured") === "on"
  const sort_order = Number(formData.get("sort_order")) || 0

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : []

  await upsertProject({
    id: id ? Number(id) : undefined,
    title,
    slug,
    client_name,
    description,
    long_description,
    url,
    image_url,
    tags,
    featured,
    sort_order,
  })

  revalidatePath("/crm/projects")
  revalidatePath("/")
}

export async function deleteProjectAction(formData: FormData) {
  const id = Number(formData.get("id"))
  await deleteProject(id)
  revalidatePath("/crm/projects")
  revalidatePath("/")
}
