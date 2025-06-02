"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/client"


export default function TestPage() {
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{
    totalScore: number
    maxScore: number
    percentage: number
    level: string
    levelResults: LevelResult[]
  } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({})
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  async function saveUserLanguageLevel(level: string) {
    const supabase = createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user?.id) return

    const { error } = await supabase
      .from("user_profiles")
      .update({ language_level: level })
      .eq("user_id", session.user.id)

    if (error) {
      console.error("Ошибка при сохранении уровня:", error.message)
    }
  }

  const calculateResults = () => {

    let determinedLevel = "A1"

    if (levelResults.find((l) => l.level === "C1" && l.percentage >= 70)) {
      determinedLevel = "C1"
    } else if (levelResults.find((l) => l.level === "B2" && l.percentage >= 70)) {
      determinedLevel = "B2"
    } else if (levelResults.find((l) => l.level === "B1" && l.percentage >= 70)) {
      determinedLevel = "B1"
    } else if (levelResults.find((l) => l.level === "A2" && l.percentage >= 70)) {
      determinedLevel = "A2"
    }

    setResults({
      totalScore,
      maxScore,
      percentage: (totalScore / maxScore) * 100,
      level: determinedLevel,
      levelResults,
    })

    saveUserLanguageLevel(determinedLevel)
  }

  // ... (всё остальное без изменений: интерфейсы, рендер вопросов, рендер результата и JSX возвращаемого значения)
} 
