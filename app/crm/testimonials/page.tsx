import Link from "next/link"
import { getTestimonials } from "@/lib/crm-queries"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import { TestimonialFormDialog } from "@/components/crm/testimonial-form-dialog"
import { DeleteButton } from "@/components/crm/delete-button"
import { deleteTestimonialAction } from "./actions"

export const metadata = {
  title: "Manage Testimonials - bienzoli CRM",
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/crm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to CRM
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
              <p className="text-sm text-muted-foreground">
                Manage client testimonials
              </p>
            </div>
          </div>
          <TestimonialFormDialog />
        </div>

        <div className="mt-8 grid gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex items-start justify-between rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-lagoon/20 to-coral/20">
                    <span className="text-xs font-bold text-foreground">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {t.role}{t.company ? `, ${t.company}` : ""}
                    </p>
                  </div>
                  {t.featured && (
                    <span className="rounded-full bg-lagoon/10 px-2 py-0.5 text-[10px] font-medium text-lagoon border border-lagoon/20">
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={`s-${t.id}-${i}`} className="h-3 w-3 fill-coral text-coral" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {`"${t.quote}"`}
                </p>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <TestimonialFormDialog testimonial={t} />
                <DeleteButton id={t.id} action={deleteTestimonialAction} label="testimonial" />
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 py-16 text-center">
              <p className="text-sm text-muted-foreground">No testimonials yet</p>
              <TestimonialFormDialog />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
