"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Course {
  id?: string
  title: string
  description: string
  price: number
  color: string
  slug: string
}

export default function CourseEditor() {
  const [courses, setCourses] = useState<Course[]>([])
  const [form, setForm] = useState<Course>({
    title: "",
    description: "",
    price: 0,
    color: "#4aacbd",
    slug: "",
  })

  const supabase = createClient()

  const fetchCourses = async () => {
    const { data } = await supabase.from("courses").select("*").order("created_at", { ascending: false })
    if (data) setCourses(data)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.slug) return

    const { error } = await supabase.from("courses").insert(form)
    if (!error) {
      await fetchCourses()
      setForm({ title: "", description: "", price: 0, color: "#4aacbd", slug: "" })
    }
  }

  const handlePriceUpdate = async (id: string, price: number) => {
    await supabase.from("courses").update({ price }).eq("id", id)
    await fetchCourses()
  }

  return (
    <div className="space-y-8">
      <div className="border p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Добавить курс</h2>
        <div className="grid gap-4">
          <div>
            <Label>Название</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <Label>Цена</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: +e.target.value })}
            />
          </div>
          <div>
            <Label>Цвет (hex/rgb)</Label>
            <Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
          <Button onClick={handleSubmit}>Добавить</Button>
        </div>
      </div>

      <div className="border p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Редактировать цену курсов</h2>
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span>{course.title}</span>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    className="w-24"
                    value={course.price}
                    onChange={(e) =>
                      setCourses((prev) =>
                        prev.map((c) => (c.id === course.id ? { ...c, price: +e.target.value } : c))
                      )
                    }
                  />
                  <Button size="sm" onClick={() => handlePriceUpdate(course.id!, course.price)}>
                    Сохранить
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
