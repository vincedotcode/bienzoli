"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { updateLeadStatus, addLeadNote, getLeadsCSV } from "@/lib/crm-queries"

const statusSchema = z.object({
  id: z.number(),
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]),
  wonValue: z.number().optional(),
})

const noteSchema = z.object({
  leadId: z.number(),
  content: z.string().min(1, "Note cannot be empty"),
})

export async function changeLeadStatus(formData: FormData) {
  const parsed = statusSchema.safeParse({
    id: Number(formData.get("id")),
    status: formData.get("status"),
    wonValue: formData.get("wonValue") ? Number(formData.get("wonValue")) : undefined,
  })

  if (!parsed.success) {
    return { error: "Invalid input" }
  }

  await updateLeadStatus(parsed.data.id, parsed.data.status, parsed.data.wonValue)
  revalidatePath("/crm")
  return { success: true }
}

export async function createNote(formData: FormData) {
  const parsed = noteSchema.safeParse({
    leadId: Number(formData.get("leadId")),
    content: formData.get("content"),
  })

  if (!parsed.success) {
    return { error: "Invalid input" }
  }

  await addLeadNote(parsed.data.leadId, parsed.data.content)
  revalidatePath("/crm")
  return { success: true }
}

export async function exportCSV() {
  const csv = await getLeadsCSV()
  return csv
}
