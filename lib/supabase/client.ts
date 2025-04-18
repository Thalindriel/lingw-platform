import { createBrowserClient } from "@supabase/ssr"
import { Database } from "@/types/supabase"

export const supabase = createBrowserClient<Database>()
