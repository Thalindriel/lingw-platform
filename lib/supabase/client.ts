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
        detectSessionInUrl: true,
      },
      global: {
        fetch: (...args) => {
          return fetch(...args).catch((err) => {
            console.error("Supabase fetch error:", err)
            throw err
          })
        },
      },
    })
  }

  return supabaseInstance
}

export const supabase = getSupabase()

export async function checkAuthStatus() {
  try {
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error("Error checking auth status:", error)
      return null
    }
    
    return data.session
  } catch (err) {
    console.error("Exception checking auth status:", err)
    return null
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error("Error signing out:", error)
      return { success: false, error }
    }
    
    return { success: true }
  } catch (err) {
    console.error("Exception signing out:", err)
    return { success: false, error: err }
  }
}
