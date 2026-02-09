import { unstable_noStore as noStore } from "next/cache"
import { sql } from "@/lib/db"
import { TestimonialsCarousel } from "./testimonials-carousel"

type Testimonial = {
  id: number
  name: string
  company: string | null
  role: string | null
  quote: string
  rating: number
}

export async function Testimonials() {
  noStore()
  let testimonials: Testimonial[] = []
  try {
    testimonials = (await sql`
      SELECT id, name, company, role, quote, rating
      FROM testimonials
      WHERE COALESCE(featured, true) = true
      ORDER BY sort_order ASC
    `) as Testimonial[]
  } catch (error) {
    console.error("Failed to load testimonials:", error)
  }

  return <TestimonialsCarousel testimonials={testimonials} />
}
