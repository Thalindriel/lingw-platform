"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"

const LEVELS = {
  A1: {
    name: "A1 Beginner",
    description:
      "Вы можете понимать и использовать знакомые повседневные выражения и очень простые фразы для конкретных целей.",
  },
  A2: {
    name: "A2 Elementary",
    description:
      "Вы можете понимать предложения и часто используемые выражения, связанные с областями непосредственного значения.",
  },
  B1: {
    name: "B1 Intermediate",
    description:
      "Вы можете понимать основные идеи четких сообщений, сделанных на литературном языке на разные темы, типично возникающие на работе, учебе, досуге и т.д.",
  },
  B2: {
    name: "B2 Upper Intermediate",
    description:
      "Вы можете понимать основные идеи сложных текстов на абстрактные и конкретные темы, включая технические дискуссии в своей области специализации.",
  },
  C1: {
    name: "C1 Advanced",
    description: "Вы можете понимать широкий спектр сложных, длинных текстов и распознавать неявный смысл.",
  },
  C2: { name: "C2 Proficiency", description: "Вы можете легко понимать практически все, что слышите или читаете." },
}

export function LanguageLevel() {
  const [level, setLevel] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function loadLanguageLevel() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) return

        const { data, error } = await supabase
          .from("user_profiles")
          .select("language_level")
          .eq("user_id", session.user.id)
          .single()

        if (error) throw error

        if (data) {
          setLevel(data.language_level)
        }
      } catch (error: any) {
        console.error("Error loading language level:", error.message)
      } finally {
        setLoading(false)
      }
    }

    loadLanguageLevel()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm flex justify-center items-center h-40">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!level || !LEVELS[level as keyof typeof LEVELS]) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Уровень владения языком</h2>
        <p className="text-gray-500">Информация о вашем уровне владения языком недоступна.</p>
      </div>
    )
  }

  const levelInfo = LEVELS[level as keyof typeof LEVELS]
  const progressPercentage =
    {
      A1: 15,
      A2: 30,
      B1: 50,
      B2: 70,
      C1: 85,
      C2: 100,
    }[level] || 0

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Уровень владения языком</h2>

      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-primary">{levelInfo.name}</span>
        <span className="text-gray-500">{progressPercentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <p className="text-gray-700">{levelInfo.description}</p>
    </div>
  )
}
