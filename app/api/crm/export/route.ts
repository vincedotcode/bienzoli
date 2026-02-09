import { NextResponse } from "next/server"
import { getLeadsCSV } from "@/lib/crm-queries"

export async function GET() {
  const csv = await getLeadsCSV()

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="bienzoli-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
