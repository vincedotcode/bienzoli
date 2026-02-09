"use server"

import { z } from "zod"
import { sql } from "@/lib/db"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  monthlyAdBudget: z.string().optional(),
  serviceNeeded: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
})

export type ContactFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    whatsapp: formData.get("whatsapp") as string,
    monthlyAdBudget: formData.get("monthlyAdBudget") as string,
    serviceNeeded: formData.get("serviceNeeded") as string,
    message: formData.get("message") as string,
    utmSource: formData.get("utmSource") as string,
    utmMedium: formData.get("utmMedium") as string,
    utmCampaign: formData.get("utmCampaign") as string,
    utmTerm: formData.get("utmTerm") as string,
    utmContent: formData.get("utmContent") as string,
  }

  const result = contactSchema.safeParse(raw)

  if (!result.success) {
    return {
      success: false,
      error: "Please check the form for errors.",
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = result.data

  try {
    // Insert into leads table
    const leadResult = await sql`
      INSERT INTO leads (name, company, email, phone, whatsapp, monthly_ad_budget, service_needed, message, source, utm_source, utm_medium, utm_campaign, utm_term, utm_content, status)
      VALUES (${data.name}, ${data.company || null}, ${data.email}, ${data.phone || null}, ${data.whatsapp || null}, ${data.monthlyAdBudget || null}, ${data.serviceNeeded}, ${data.message}, ${"website"}, ${data.utmSource || null}, ${data.utmMedium || null}, ${data.utmCampaign || null}, ${data.utmTerm || null}, ${data.utmContent || null}, ${"new"})
      RETURNING id
    `

    const leadId = leadResult[0]?.id

    // Store contact submission payload
    await sql`
      INSERT INTO contact_submissions (lead_id, payload)
      VALUES (${leadId}, ${JSON.stringify(data)})
    `

    // Log initial activity
    await sql`
      INSERT INTO lead_activities (lead_id, type, content)
      VALUES (${leadId}, ${"form_submission"}, ${"New lead from website contact form"})
    `

    // Log WhatsApp notification event (pending - provider integration ready)
    if (data.whatsapp) {
      await sql`
        INSERT INTO whatsapp_events (lead_id, event_type, status, payload)
        VALUES (${leadId}, ${"notification"}, ${"pending"}, ${JSON.stringify({
          to: process.env.AGENCY_WHATSAPP_NUMBER || "",
          message: `New lead: ${data.name} from ${data.company || "N/A"} - ${data.serviceNeeded}`,
        })})
      `
    }

    return { success: true }
  } catch (e) {
    console.error("Contact form submission error:", e)
    return {
      success: false,
      error: "Something went wrong. Please try again or message us on WhatsApp.",
    }
  }
}
