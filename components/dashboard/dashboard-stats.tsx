"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"

interface DashboardStatsProps {
  userId: string
}

export function DashboardStats({ userId }: DashboardStatsProps) {
  const [stats, setStats] = useState({
    streak_days: 0,
    study_hours: 0,
    words_learned: 0,
    language_level: "A1",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function loadStats() {
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("streak_days, study_hours, words_learned, language_level")
          .eq("user_id", userId)
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
  }, [userId])

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm flex justify-center items-center h-40">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Ваша статистика</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-3xl">🔥</div>
          <div className="text-2xl font-bold text-primary">{stats.streak_days}</div>
          <div className="text-sm text-gray-500">Дней подряд</div>
        </div>

        <div className="text-center">
          <div className="text-3xl">⏱️</div>
          <div className="text-2xl font-bold text-primary">{stats.study_hours}</div>
          <div className="text-sm text-gray-500">Часов обучения</div>
        </div>

        <div className="text-center">
          <div className="text-3xl">📚</div>
          <div className="text-2xl font-bold text-primary">{stats.words_learned}</div>
          <div className="text-sm text-gray-500">Слов изучено</div>
        </div>

        <div className="text-center">
          <div className="text-3xl">🎯</div>
          <div className="text-2xl font-bold text-primary">{stats.language_level}</div>
          <div className="text-sm text-gray-500">Текущий уровень</div>
        </div>
      </div>
    </div>
  )
}
