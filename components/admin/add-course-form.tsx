"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function AddCourseForm({ onCourseAdded }: { onCourseAdded: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [color, setColor] = useState("#4aacbd")
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("courses").insert([
      {
        title,
        description,
        price: Number(price),
        color,
        slug,
      },
    ])

    if (!error) {
      setTitle("")
      setDescription("")
      setPrice("")
      setSlug("")
      onCourseAdded()
    } else {
      console.error("Ошибка добавления курса:", error)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Название курса" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input placeholder="Описание курса" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <Input placeholder="Цена (₽)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <Input placeholder="Цвет (hex)" value={color} onChange={(e) => setColor(e.target.value)} />
      <Input placeholder="Slug (url)" value={slug} onChange={(e) => setSlug(e.target.value)} required />
      <Button type="submit" className="bg-primary hover:bg-primary/90 w-full" disabled={loading}>
        {loading ? "Добавление..." : "Добавить курс"}
      </Button>
    </form>
  )
}
