"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"

interface Course {
  id: string
  title: string
  progress: number
  lessons_completed: number
  total_lessons: number
  next_lesson: {
    id: string
    title: string
  } | null
}

interface DashboardCoursesProps {
  userId: string
}

export function DashboardCourses({ userId }: DashboardCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function loadCourses() {
      try {
        const { data: userCourses, error: userCoursesError } = await supabase
          .from("user_courses")
          .select(`
            id,
            course_id,
            progress,
            lessons_completed,
            total_lessons
          `)
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(3)

        if (userCoursesError) throw userCoursesError

        if (!userCourses || userCourses.length === 0) {
          setLoading(false)
          return
        }

        const coursePromises = userCourses.map(async (userCourse) => {
          const { data: course } = await supabase
            .from("courses")
            .select("id, title")
            .eq("id", userCourse.course_id)
            .single()

          const { data: nextLesson } = await supabase
            .from("lessons")
            .select("id, title")
            .eq("course_id", userCourse.course_id)
            .order("order_index", { ascending: true })
            .limit(1)

          return {
            id: course?.id || "",
            title: course?.title || "",
            progress: userCourse.progress,
            lessons_completed: userCourse.lessons_completed,
            total_lessons: userCourse.total_lessons,
            next_lesson: nextLesson && nextLesson.length > 0 ? nextLesson[0] : null,
          }
        })

        const coursesData = await Promise.all(coursePromises)
        setCourses(coursesData)
      } catch (error: any) {
        console.error("Error loading courses:", error.message)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [userId])

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm flex justify-center items-center h-40">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Ваши курсы</h2>
        <p className="text-gray-600 mb-4">
          У вас пока нет активных курсов. Выберите курс из нашего каталога и начните обучение!
        </p>
        <Button className="bg-primary hover:bg-primary/90">
          <Link href="/courses">Перейти к курсам</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Ваши курсы</h2>
        <Button variant="outline" size="sm">
          <Link href="/profile/courses">Все курсы</Link>
        </Button>
      </div>

      <div className="space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{course.title}</h3>
              <span className="text-primary font-bold">{course.progress}%</span>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              Пройдено {course.lessons_completed} из {course.total_lessons} уроков
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>

            {course.next_lesson && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Следующий урок</p>
                  <p className="text-sm font-medium">{course.next_lesson.title}</p>
                </div>

                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Link href={`/lessons/${course.next_lesson.id}`}>Продолжить</Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
