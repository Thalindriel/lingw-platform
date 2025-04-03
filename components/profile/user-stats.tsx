"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"

interface UserStats {
  streak_days: number
  study_hours: number
  words_learned: number
  language_level: string
}

export function UserStats() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) return

        const { data, error } = await supabase
          .from("user_profiles")
          .select("streak_days, study_hours, words_learned, language_level")
          .eq("user_id", session.user.id)
          .single()

        if (error) throw error

        if (data) {
          setStats(data)
        }
      } catch (error: any) {
        console.error("Error loading stats:", error.message)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center h-32">
            <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center h-32">
            <p className="text-gray-400">Нет данных</p>
          </div>
        ))}
      </div>
    )
  }

  const statItems = [
    {
      icon: "🔥",
      value: stats.streak_days,
      label: "Дней подряд",
    },
    {
      icon: "⏱️",
      value: stats.study_hours,
      label: "Часов обучения",
    },
    {
      icon: "📚",
      value: stats.words_learned,
      label: "Слов изучено",
    },
    {
      icon: "🎯",
      value: stats.language_level,
      label: "Текущий уровень",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
          <div className="text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-2xl font-bold text-blue-600">{item.value}</span>
              <span className="text-sm text-gray-500">{item.label}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

