import Link from "next/link"
import { getProjects } from "@/lib/crm-queries"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, ExternalLink, Pencil } from "lucide-react"
import { ProjectFormDialog } from "@/components/crm/project-form-dialog"
import { DeleteButton } from "@/components/crm/delete-button"
import { deleteProjectAction } from "./actions"

export const metadata = {
  title: "Manage Projects - bienzoli CRM",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

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
              <h1 className="text-2xl font-bold text-foreground">Projects</h1>
              <p className="text-sm text-muted-foreground">
                Manage your portfolio projects
              </p>
            </div>
          </div>
          <ProjectFormDialog />
        </div>

        <div className="mt-8 grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="rounded-full bg-lagoon/10 px-2 py-0.5 text-[10px] font-medium text-lagoon border border-lagoon/20">
                      Featured
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    #{project.sort_order}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {project.url && (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                <ProjectFormDialog project={project} />
                <DeleteButton id={project.id} action={deleteProjectAction} label="project" />
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 py-16 text-center">
              <p className="text-sm text-muted-foreground">No projects yet</p>
              <ProjectFormDialog />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
