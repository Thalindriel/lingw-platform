"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"

interface UserCourse {
  id: string
  course: {
    id: string
    title: string
  } | null
}

export function UserCourses() {
  const [courses, setCourses] = useState<UserCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    async function loadUserCourses() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) return

        const { data, error } = await supabase
          .from("user_courses")
          .select(`
            id,
            course:course_id (
              id,
              title
            )
          `)
          .eq("user_id", session.user.id)

        if (error) throw error

        setCourses(data || [])
      } catch (error: any) {
        console.error("Error loading user courses:", error.message)
        setError("Не удалось загрузить курсы. Пожалуйста, попробуйте позже.")
      } finally {
        setLoading(false)
      }
    }

    loadUserCourses()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <p>{error}</p>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm text-center">
        <h2 className="text-xl font-bold mb-4">У вас пока нет курсов</h2>
        <p className="text-gray-600 mb-6">
          Выберите курс из нашего каталога и начните обучение прямо сейчас!
        </p>
        <Button className="bg-primary hover:bg-primary/90">
          <Link href="/courses">Перейти к курсам</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Мои курсы</h2>

      {courses.map((course) => (
        <div key={course.id} className="bg-blue-50 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              {course.course?.title ?? "Название курса недоступно"}
            </h3>
            <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
              Активен
            </span>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90">
          <Link href="/courses">Все курсы</Link>
        </Button>
      </div>
    </div>
  )
}
