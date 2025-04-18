import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient(): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not set')
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
