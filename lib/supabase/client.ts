import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export const getSupabase = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables. Authentication will not work.")
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }

  return supabaseInstance
}

export const supabase = getSupabase()
