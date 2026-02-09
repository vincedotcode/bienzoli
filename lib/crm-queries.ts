import { sql } from "@/lib/db"

type DbError = {
  code?: string
  message?: string
}

function isMissingRelationError(error: unknown, relation: string): boolean {
  if (!error || typeof error !== "object") return false

  const dbError = error as DbError
  if (dbError.code !== "42P01") return false
  if (typeof dbError.message !== "string") return true

  return dbError.message.includes(`"${relation}"`) || dbError.message.includes(relation)
}

function missingTableHint(table: string): Error {
  return new Error(`Database table "${table}" is missing. Run scripts/setup.sql against your database.`)
}

export type Lead = {
  id: number
  name: string
  company: string | null
  email: string
  phone: string | null
  whatsapp: string | null
  monthly_ad_budget: string | null
  service_needed: string | null
  message: string | null
  source: string | null
  status: string
  won_value: number
  created_at: string
  updated_at: string
}

export type LeadActivity = {
  id: number
  lead_id: number
  type: string
  content: string | null
  created_at: string
}

export type KPIData = {
  total_leads: number
  new_this_week: number
  qualified: number
  won_value: number
}

export async function getKPIs(): Promise<KPIData> {
  const [totals] = await sql`SELECT COUNT(*) as total_leads FROM leads`
  const [newThisWeek] = await sql`SELECT COUNT(*) as new_this_week FROM leads WHERE created_at >= NOW() - INTERVAL '7 days'`
  const [qualified] = await sql`SELECT COUNT(*) as qualified FROM leads WHERE status = 'qualified'`
  const [wonValue] = await sql`SELECT COALESCE(SUM(won_value), 0) as won_value FROM leads WHERE status = 'won'`

  return {
    total_leads: Number(totals.total_leads),
    new_this_week: Number(newThisWeek.new_this_week),
    qualified: Number(qualified.qualified),
    won_value: Number(wonValue.won_value),
  }
}

export async function getLeads(
  search?: string,
  status?: string,
  sort?: string
): Promise<Lead[]> {
  let query = "SELECT * FROM leads WHERE 1=1"
  const params: (string | number)[] = []
  let paramIndex = 1

  if (search) {
    query += ` AND (name ILIKE $${paramIndex} OR company ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`
    params.push(`%${search}%`)
    paramIndex++
  }

  if (status && status !== "all") {
    query += ` AND status = $${paramIndex}`
    params.push(status)
    paramIndex++
  }

  if (sort === "oldest") {
    query += " ORDER BY created_at ASC"
  } else if (sort === "name") {
    query += " ORDER BY name ASC"
  } else {
    query += " ORDER BY created_at DESC"
  }

  // Use parameterized query via tagged template
  if (params.length === 0) {
    return (await sql`SELECT * FROM leads ORDER BY created_at DESC`) as Lead[]
  }

  if (search && status && status !== "all") {
    return (await sql`
      SELECT * FROM leads
      WHERE (name ILIKE ${`%${search}%`} OR company ILIKE ${`%${search}%`} OR email ILIKE ${`%${search}%`})
      AND status = ${status}
      ORDER BY created_at DESC
    `) as Lead[]
  }

  if (search) {
    return (await sql`
      SELECT * FROM leads
      WHERE (name ILIKE ${`%${search}%`} OR company ILIKE ${`%${search}%`} OR email ILIKE ${`%${search}%`})
      ORDER BY created_at DESC
    `) as Lead[]
  }

  if (status && status !== "all") {
    return (await sql`
      SELECT * FROM leads
      WHERE status = ${status}
      ORDER BY created_at DESC
    `) as Lead[]
  }

  return (await sql`SELECT * FROM leads ORDER BY created_at DESC`) as Lead[]
}

export async function getLeadById(id: number): Promise<Lead | null> {
  const rows = await sql`SELECT * FROM leads WHERE id = ${id}`
  return (rows[0] as Lead) || null
}

export async function getLeadActivities(
  leadId: number
): Promise<LeadActivity[]> {
  return (await sql`
    SELECT * FROM lead_activities
    WHERE lead_id = ${leadId}
    ORDER BY created_at DESC
  `) as LeadActivity[]
}

export async function updateLeadStatus(
  id: number,
  status: string,
  wonValue?: number
): Promise<void> {
  await sql`
    UPDATE leads
    SET status = ${status}, won_value = ${wonValue ?? 0}, updated_at = NOW()
    WHERE id = ${id}
  `

  await sql`
    INSERT INTO lead_activities (lead_id, type, content)
    VALUES (${id}, ${"status_change"}, ${`Status changed to ${status}`})
  `
}

export async function addLeadNote(
  leadId: number,
  content: string
): Promise<void> {
  await sql`
    INSERT INTO lead_activities (lead_id, type, content)
    VALUES (${leadId}, ${"note"}, ${content})
  `
}

// ---- Projects ----
export type Project = {
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
  created_at: string
  updated_at: string
}

export async function getProjects(): Promise<Project[]> {
  try {
    return (await sql`SELECT * FROM projects ORDER BY sort_order ASC`) as Project[]
  } catch (error) {
    if (isMissingRelationError(error, "projects")) return []
    throw error
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  try {
    const rows = await sql`SELECT * FROM projects WHERE id = ${id}`
    return (rows[0] as Project) || null
  } catch (error) {
    if (isMissingRelationError(error, "projects")) return null
    throw error
  }
}

export async function upsertProject(data: {
  id?: number
  title: string
  slug: string
  client_name?: string
  description: string
  long_description?: string
  url?: string
  image_url?: string
  tags?: string[]
  featured?: boolean
  sort_order?: number
}): Promise<void> {
  try {
    if (data.id) {
      await sql`
        UPDATE projects SET
          title = ${data.title},
          slug = ${data.slug},
          client_name = ${data.client_name || null},
          description = ${data.description},
          long_description = ${data.long_description || null},
          url = ${data.url || null},
          image_url = ${data.image_url || null},
          tags = ${data.tags || []},
          featured = ${data.featured ?? true},
          sort_order = ${data.sort_order ?? 0},
          updated_at = NOW()
        WHERE id = ${data.id}
      `
    } else {
      await sql`
        INSERT INTO projects (title, slug, client_name, description, long_description, url, image_url, tags, featured, sort_order)
        VALUES (${data.title}, ${data.slug}, ${data.client_name || null}, ${data.description}, ${data.long_description || null}, ${data.url || null}, ${data.image_url || null}, ${data.tags || []}, ${data.featured ?? true}, ${data.sort_order ?? 0})
      `
    }
  } catch (error) {
    if (isMissingRelationError(error, "projects")) throw missingTableHint("projects")
    throw error
  }
}

export async function deleteProject(id: number): Promise<void> {
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`
  } catch (error) {
    if (isMissingRelationError(error, "projects")) throw missingTableHint("projects")
    throw error
  }
}

// ---- Testimonials ----
export type Testimonial = {
  id: number
  name: string
  company: string | null
  role: string | null
  quote: string
  rating: number
  avatar_url: string | null
  featured: boolean
  sort_order: number
  created_at: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return (await sql`SELECT * FROM testimonials ORDER BY sort_order ASC`) as Testimonial[]
  } catch (error) {
    if (isMissingRelationError(error, "testimonials")) return []
    throw error
  }
}

export async function upsertTestimonial(data: {
  id?: number
  name: string
  company?: string
  role?: string
  quote: string
  rating?: number
  avatar_url?: string
  featured?: boolean
  sort_order?: number
}): Promise<void> {
  try {
    if (data.id) {
      await sql`
        UPDATE testimonials SET
          name = ${data.name},
          company = ${data.company || null},
          role = ${data.role || null},
          quote = ${data.quote},
          rating = ${data.rating ?? 5},
          avatar_url = ${data.avatar_url || null},
          featured = ${data.featured ?? true},
          sort_order = ${data.sort_order ?? 0},
          updated_at = NOW()
        WHERE id = ${data.id}
      `
    } else {
      await sql`
        INSERT INTO testimonials (name, company, role, quote, rating, avatar_url, featured, sort_order)
        VALUES (${data.name}, ${data.company || null}, ${data.role || null}, ${data.quote}, ${data.rating ?? 5}, ${data.avatar_url || null}, ${data.featured ?? true}, ${data.sort_order ?? 0})
      `
    }
  } catch (error) {
    if (isMissingRelationError(error, "testimonials")) throw missingTableHint("testimonials")
    throw error
  }
}

export async function deleteTestimonial(id: number): Promise<void> {
  try {
    await sql`DELETE FROM testimonials WHERE id = ${id}`
  } catch (error) {
    if (isMissingRelationError(error, "testimonials")) throw missingTableHint("testimonials")
    throw error
  }
}

// ---- CSV Export ----
export async function getLeadsCSV(): Promise<string> {
  const leads = await sql`SELECT * FROM leads ORDER BY created_at DESC`
  if (leads.length === 0) return ""

  const headers = Object.keys(leads[0]).join(",")
  const rows = leads.map((lead) =>
    Object.values(lead)
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  )

  return [headers, ...rows].join("\n")
}
