"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export function CourseList() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [priceValue, setPriceValue] = useState<number>(0)

  const supabase = createClient()

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false })
      if (!error && data) {
        setCourses(data)
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  const handleEdit = (id: string, currentPrice: number) => {
    setEditingId(id)
    setPriceValue(currentPrice)
  }

  const handleSave = async (id: string) => {
    const { error } = await supabase.from("courses").update({ price: priceValue }).eq("id", id)
    if (!error) {
      setCourses((prev) =>
        prev.map((course) => (course.id === id ? { ...course, price: priceValue } : course))
      )
    }
    setEditingId(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {courses.map((course) => (
        <div
          key={course.id}
          className="rounded-lg overflow-hidden shadow"
          style={{
            background: `linear-gradient(90deg, ${course.color} 0%, ${adjustColor(course.color, -20)} 100%)`,
          }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-md">{course.title}</h2>
            <p className="text-white/90 mb-4">{course.description}</p>
            <div className="flex items-center justify-between">
              {editingId === course.id ? (
                <>
                  <Input
                    type="number"
                    value={priceValue}
                    onChange={(e) => setPriceValue(parseInt(e.target.value))}
                    className="w-24"
                  />
                  <Button onClick={() => handleSave(course.id)} variant="outline" className="ml-2 bg-white">
                    Сохранить
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-2xl font-bold text-white">
                    {course.price}₽ <span className="text-white/50 text-sm">в месяц</span>
                  </span>
                  <Button onClick={() => handleEdit(course.id, course.price)} variant="outline" className="bg-white">
                    Изменить цену
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function adjustColor(color: string, amount: number): string {
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (!rgbMatch) return color
  const r = Math.max(0, Math.min(255, Number(rgbMatch[1]) + amount))
  const g = Math.max(0, Math.min(255, Number(rgbMatch[2]) + amount))
  const b = Math.max(0, Math.min(255, Number(rgbMatch[3]) + amount))
  return `rgb(${r}, ${g}, ${b})`
}
