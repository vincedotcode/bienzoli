import { neon } from "@neondatabase/serverless"
import fs from "node:fs"
import path from "node:path"

let hasLoggedDatabaseSource = false

function getLocalDatabaseUrl(): string | undefined {
  try {
    const envLocalPath = path.join(process.cwd(), ".env.local")
    if (!fs.existsSync(envLocalPath)) return undefined

    const content = fs.readFileSync(envLocalPath, "utf8")
    const line = content
      .split("\n")
      .find((entry) => entry.trim().startsWith("DATABASE_URL="))

    if (!line) return undefined
    const value = line.slice("DATABASE_URL=".length).trim()
    return value || undefined
  } catch {
    return undefined
  }
}

function getDatabaseUrl() {
  const envValue = process.env.DATABASE_URL?.trim()
  const localValue = process.env.NODE_ENV === "production" ? undefined : getLocalDatabaseUrl()
  const value = localValue || envValue

  if (!value) {
    throw new Error(
      "Missing DATABASE_URL. Set a Postgres connection string in .env.local (postgresql://...).",
    )
  }

  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    throw new Error(
      "Invalid DATABASE_URL format. Expected a Postgres connection string like postgresql://user:pass@host:5432/dbname.",
    )
  }

  if (parsed.protocol !== "postgres:" && parsed.protocol !== "postgresql:") {
    throw new Error(
      `Invalid DATABASE_URL protocol "${parsed.protocol}". Use a Postgres URL starting with postgres:// or postgresql://.`,
    )
  }

  if (parsed.hostname.startsWith("api.") && parsed.hostname.endsWith(".supabase.co")) {
    throw new Error(
      "DATABASE_URL points to a Supabase API host. Use the Postgres connection host instead (for example db.<project-ref>.supabase.co or the Supabase pooler host).",
    )
  }

  if (!hasLoggedDatabaseSource && process.env.NODE_ENV !== "production") {
    hasLoggedDatabaseSource = true

    if (localValue && envValue && localValue !== envValue) {
      console.warn(
        "DATABASE_URL differs between shell env and .env.local; using .env.local for local runtime.",
      )
    }
  }

  return value
}

export const sql = neon(getDatabaseUrl())
