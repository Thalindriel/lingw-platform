import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if the required environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Please check your .env file.")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

