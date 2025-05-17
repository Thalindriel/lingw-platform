"use client"
export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ScheduleItem = {
  id: string
  lesson_title: string
  teacher_name: string
  zoom_link: string
  date: string
  time: string
  is_deadline: boolean
}

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const supabase = createClient()

  const createScheduleForUser = async (userId: string, courseId: string) => {
    const { data: lessons, error } = await supabase
      .from("lessons")
      .select("id, title")
      .eq("course_id", courseId)

    if (error || !lessons || lessons.length === 0) {
      console.error("Ошибка загрузки уроков курса:", error)
      return
    }

    const today = new Date()

    const scheduleEntries = lessons.map((lesson, index) => {
      const date = new Date(today)
      date.setDate(today.getDate() + 1 + index)

      return {
        user_id: userId,
        course_id: courseId,
        lesson_id: lesson.id,
        teacher_name: "Преподаватель " + index,
        zoom_link: "https://zoom.us/fake-meeting-link",
        date: date.toISOString().split("T")[0],
        time: "10:00",
        is_deadline: false,
      }
    })

    const { error: insertError } = await supabase
      .from("schedules")
      .insert(scheduleEntries)

    if (insertError) {
      console.error("Ошибка вставки расписания:", insertError)
    }
  }

  useEffect(() => {
    const fetchSchedule = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) return

      const { data, error } = await supabase
        .from("schedules")
        .select(`id, teacher_name, zoom_link, date, time, is_deadline, lessons ( title )`)
        .eq("user_id", session.user.id)
        .order("date", { ascending: true })

      if (error) {
        console.error("Ошибка при загрузке расписания:", error)
        return
      }

      const formatted = data.map((item: any) => ({
        id: item.id,
        teacher_name: item.teacher_name,
        zoom_link: item.zoom_link,
        date: item.date,
        time: item.time,
        is_deadline: item.is_deadline,
        lesson_title: item.lessons?.title || "Без названия",
      }))

      setSchedule(formatted)
    }

    fetchSchedule()
  }, [])

  const handleApproveRequest = async (requestId: string, courseId: string, userId: string) => {
    await supabase
      .from("course_signup_requests")
      .update({ status: "approved" })
      .eq("id", requestId)

    await createScheduleForUser(userId, courseId)

    setSchedule((prevSchedule) => [...prevSchedule])
  }

  // Форматирование даты
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", weekday: "long" }
    return date.toLocaleDateString("ru-RU", options)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userName="Дмитрий Корюков" />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Календарь занятий</h1>
            <div className="flex gap-2">
              <Button variant="outline">📅 Календарь</Button>
              <Button className="bg-primary hover:bg-primary/90">➕ Добавить</Button>
            </div>
          </div>

          <p className="text-gray-600 mb-8">Ближайшие занятия и дедлайны</p>

          <div className="space-y-8">
            {schedule.length === 0 && <p>Расписание не найдено.</p>}

            {schedule.map((item) => {
              const dateObj = new Date(item.date)
              const day = dateObj.getDate()
              const weekday = dateObj.toLocaleDateString("ru-RU", { weekday: "long" })
              const month = dateObj.toLocaleDateString("ru-RU", { month: "long" })

              return (
                <div key={item.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center text-blue-500 mb-2">
                    <span className="text-xl font-bold mr-2">{day}</span>
                    <div>
                      <p className="font-medium capitalize">{weekday}</p>
                      <p className="text-sm capitalize">{month}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xl font-bold">{item.time}</p>
                        <h3 className="text-lg font-bold">{item.lesson_title}</h3>
                        <p className="text-gray-600">
                          {item.is_deadline ? "Работа" : "Видеоурок в Zoom"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.is_deadline
                            ? "bg-red-50 text-red-500"
                            : "bg-blue-50 text-blue-600"
                        }
                      >
                        {item.is_deadline ? "Дедлайн" : "Урок"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <span>👤</span>
                        <span className="text-sm">{item.teacher_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🖥️</span>
                        <span className="text-sm">
                          {item.zoom_link.includes("zoom") ? "Zoom" : "Видеозвонок"}
                        </span>
                      </div>
                    </div>

                    {!item.is_deadline && (
                      <a href={item.zoom_link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-primary hover:bg-primary/90">Присоединиться</Button>
                      </a>
                    )}

                    {item.is_deadline && (
                      <Button variant="destructive">Сдать работу</Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
