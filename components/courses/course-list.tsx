"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface Course {
  id: string
  title: string
  description: string
  price: number
  color: string
  slug: string
}

interface Props {
  editable?: boolean
}

export function CourseList({ editable = false }: Props) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("courses").select("*")
      if (!error && data) {
        setCourses(data)
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  const handlePriceChange = async (id: string, newPrice: number) => {
    const supabase = createClient()
    await supabase.from("courses").update({ price: newPrice }).eq("id", id)
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, price: newPrice } : course))
    )
  }

  const adjustColor = (color: string, amount: number): string => {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (!match) return color
    const r = Math.max(0, Math.min(255, parseInt(match[1]) + amount))
    const g = Math.max(0, Math.min(255, parseInt(match[2]) + amount))
    const b = Math.max(0, Math.min(255, parseInt(match[3]) + amount))
    return `rgb(${r},${g},${b})`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {courses.map((course) => (
        <div
          key={course.id}
          className="rounded-lg overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${course.color} 0%, ${adjustColor(course.color, -20)} 100%)`,
          }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-md">{course.title}</h2>
            <p className="text-white/90 mb-4">{course.description}</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start text-white/90">
                <span className="text-white mr-2">✓</span>
                <span>Индивидуальный подход</span>
              </li>
              <li className="flex items-start text-white/90">
                <span className="text-white mr-2">✓</span>
                <span>Практические задания</span>
              </li>
              <li className="flex items-start text-white/90">
                <span className="text-white mr-2">✓</span>
                <span>Обратная связь от преподавателя</span>
              </li>
              <li className="flex items-start text-white/90">
                <span className="text-white mr-2">✓</span>
                <span>Сертификат по окончании</span>
              </li>
            </ul>

            <div className="flex items-center justify-between">
              {!editable ? (
                <>
                  <span className="text-2xl font-bold text-white">
                    {course.price}₽ <span className="text-white/50 text-sm">в месяц</span>
                  </span>
                  <Link href={`/courses/${course.slug}`}>
                    <Button variant="outline" className="bg-white hover:bg-white/90">
                      Подробнее
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <input
                    type="number"
                    value={course.price}
                    onChange={(e) => handlePriceChange(course.id, parseInt(e.target.value))}
                    className="w-24 rounded px-2 py-1 text-sm"
                  />
                  <span className="text-white text-sm">₽ в месяц</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
