import { unstable_noStore as noStore } from "next/cache"
import { sql } from "@/lib/db"
import { ProjectsGrid } from "./projects-grid"

type Project = {
  id: number
  title: string
  slug: string
  client_name: string | null
  description: string
  url: string | null
  tags: string[]
  featured: boolean
  sort_order: number
}

export async function ProjectsShowcase() {
  noStore()
  let projects: Project[] = []
  try {
    projects = (await sql`
      SELECT id, title, slug, client_name, description, url, tags, featured, sort_order
      FROM projects
      WHERE COALESCE(featured, true) = true
      ORDER BY sort_order ASC
    `) as Project[]
  } catch (error) {
    console.error("Failed to load featured projects:", error)
  }

  return <ProjectsGrid projects={projects} />
}
