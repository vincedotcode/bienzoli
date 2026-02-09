"use server"

import { revalidatePath } from "next/cache"
import { upsertTestimonial, deleteTestimonial } from "@/lib/crm-queries"

export async function saveTestimonialAction(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const company = formData.get("company") as string
  const role = formData.get("role") as string
  const quote = formData.get("quote") as string
  const rating = Number(formData.get("rating")) || 5
  const avatar_url = formData.get("avatar_url") as string
  const featured = formData.get("featured") === "on"
  const sort_order = Number(formData.get("sort_order")) || 0

  await upsertTestimonial({
    id: id ? Number(id) : undefined,
    name,
    company,
    role,
    quote,
    rating,
    avatar_url,
    featured,
    sort_order,
  })

  revalidatePath("/crm/testimonials")
  revalidatePath("/")
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = Number(formData.get("id"))
  await deleteTestimonial(id)
  revalidatePath("/crm/testimonials")
  revalidatePath("/")
}
