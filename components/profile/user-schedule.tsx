"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

type ScheduleItem = {
  id: string
  teacher_name: string
  zoom_link: string
  date: string
  time: string
  lesson_title: string
}

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchSchedule = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      const { data, error } = await supabase
        .from("schedules")
        .select(`
          id,
          teacher_name,
          zoom_link,
          date,
          time,
          lesson:lesson_id (
            title
          )
        `)
        .eq("user_id", session.user.id)
        .order("date", { ascending: true })

      if (error) {
        console.error("Ошибка при загрузке расписания:", error)
        return
      }

      const formatted = data.map((item: any) => ({
        id: item.id,
        teacher_name: item.teacher_name || "Преподаватель",
        zoom_link: item.zoom_link,
        date: item.date,
        time: item.time,
        lesson_title: item.lesson?.title || "Без названия",
      }))

      setSchedule(formatted)
    }

    fetchSchedule()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userName="Дмитрий Корюков" />

      <main className="flex-1 container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Моё расписание</h1>

        {schedule.length === 0 ? (
          <p className="text-gray-600">Пока нет занятий.</p>
        ) : (
          <div className="space-y-6">
            {schedule.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-6">
                <p className="text-xl font-semibold mb-1">{item.lesson_title}</p>
                <p className="text-gray-700 mb-1">Дата: {item.date}</p>
                <p className="text-gray-700 mb-1">Время: {item.time}</p>
                <p className="text-gray-700 mb-3">Преподаватель: {item.teacher_name}</p>
                <a href={item.zoom_link} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary hover:bg-primary/90">Присоединиться по Zoom</Button>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
