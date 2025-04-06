"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient, Session } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: Session | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createClientComponentClient<Database>({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      options: {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      },
    }),
  )
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      console.log("Initial session check:", data.session ? "Authenticated" : "Not authenticated")
      setSession(data.session)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session ? "Session exists" : "No session")
      setSession(session)
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to home")
        setTimeout(() => {
          window.location.href = '/'
        }, 100)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return <Context.Provider value={{ supabase, session }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}
