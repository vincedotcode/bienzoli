import { NextResponse } from "next/server"
import { getLeadById, getLeadActivities } from "@/lib/crm-queries"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const leadId = Number(id)

  if (Number.isNaN(leadId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  const [lead, activities] = await Promise.all([
    getLeadById(leadId),
    getLeadActivities(leadId),
  ])

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  }

  return NextResponse.json({ lead, activities })
}
