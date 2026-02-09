import { neon } from "@neondatabase/serverless"

function getDatabaseUrl() {
  const value = process.env.DATABASE_URL?.trim()

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

  return value
}

export const sql = neon(getDatabaseUrl())
