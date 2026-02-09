import type { Metadata } from "next"
import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { MessageCircle, Mail, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact — bienzoli",
  description:
    "Get in touch with bienzoli. Tell us about your project and we'll get back to you within 24 hours.",
}

const WHATSAPP_NUMBER = "23057000000"
const WHATSAPP_MSG = encodeURIComponent(
  "Hi bienzoli! I'd like to discuss a project."
)

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-5">
              {/* Left column - Info */}
              <div className="lg:col-span-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-lagoon">
                  Get in touch
                </span>
                <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Start your project
                </h1>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  Fill in the form and our team will get back to you within 24
                  hours. Or reach out directly — we love a good conversation.
                </p>

                <div className="mt-10 flex flex-col gap-6">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lagoon/10 transition-colors group-hover:bg-lagoon/20">
                      <MessageCircle className="h-5 w-5 text-lagoon" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        WhatsApp
                      </p>
                      <p className="text-sm text-muted-foreground">
                        +230 5700 0000
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@bienzoli.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lagoon/10 transition-colors group-hover:bg-lagoon/20">
                      <Mail className="h-5 w-5 text-lagoon" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Email
                      </p>
                      <p className="text-sm text-muted-foreground">
                        hello@bienzoli.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lagoon/10">
                      <MapPin className="h-5 w-5 text-lagoon" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Location
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Port Louis, Mauritius
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Form */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8">
                  <Suspense fallback={<div className="min-h-[600px] animate-pulse rounded-lg bg-muted" />}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
