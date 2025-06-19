"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type ScheduleItem = {
  id: string
  course_title: string
  teacher_name: string
  zoom_link: string
  date: string
  time: string
}

export default function UserSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session?.user) return

        const { data, error } = await supabase
          .from("schedules")
          .select(`
            id,
            zoom_link,
            date,
            time,
            teacher_name,
            courses (
              title
            )
          `)
          .eq("user_id", session.user.id)
          .order("date", { ascending: true })

        if (error) {
          console.error("Ошибка загрузки расписания:", error)
          return
        }

        const normalized = (data ?? []).map((item: any) => ({
          id: item.id || crypto.randomUUID(),
          teacher_name: item.teacher_name ?? "Преподаватель",
          zoom_link: item.zoom_link ?? "—",
          date: item.date ?? "—",
          time: item.time ?? "—",
          course_title: item.courses?.title ?? "Курс не найден",
        }))

        setSchedule(normalized)
      } catch (err) {
        console.error("Непредвиденная ошибка при загрузке расписания:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [supabase])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ваше расписание</h1>

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : !schedule || schedule.length === 0 ? (
        <p className="text-gray-500">У вас пока нет назначенных занятий.</p>
      ) : (
        <div className="grid gap-6">
          {schedule.map((item) => (
            <div key={item.id} className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Дата:</strong> {item.date} в {item.time}
              </p>
              <p className="text-md">
                <strong>Курс:</strong> {item.course_title}
              </p>
              <p className="text-md">
                <strong>Преподаватель:</strong> {item.teacher_name}
              </p>
              <div>
                {item.zoom_link !== "—" ? (
                  <a
                    href={item.zoom_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                  >
                    Перейти к занятию
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">Ссылка будет добавлена позже</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
