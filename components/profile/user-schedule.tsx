"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type ScheduleItem = {
  id: string
  teacher_name: string
  zoom_link: string
  date: string
  time: string
}

export function UserSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchSchedule = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session?.user) {
        console.error("Ошибка сессии:", sessionError)
        return
      }

      const { data, error } = await supabase
        .from("schedules")
        .select("id, teacher_name, zoom_link, date, time")
        .eq("user_id", session.user.id)
        .order("date", { ascending: true })

      if (error) {
        console.error("Ошибка при загрузке расписания:", error)
        return
      }

      const safeData = (data ?? []).filter(Boolean).map((item) => ({
        id: item.id ?? `no-id-${Math.random()}`,
        teacher_name: item.teacher_name ?? "Преподаватель",
        zoom_link: item.zoom_link ?? "—",
        date: item.date ?? "—",
        time: item.time ?? "—",
      }))

      setSchedule(safeData)
    }

    fetchSchedule()
  }, [])

  return (
    <div className="space-y-6">
      {schedule.length === 0 ? (
        <p className="text-muted-foreground">Нет назначенных занятий.</p>
      ) : (
        schedule.map((item) => {
          if (!item || !item.id) return null

          return (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white shadow-sm p-5"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-gray-500">Дата и время</p>
                  <p className="text-base font-medium">
                    {item.date} в {item.time}
                  </p>
                </div>
                {item.zoom_link !== "—" && typeof item.zoom_link === "string" && (
                  <a
                    href={item.zoom_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Перейти в Zoom →
                  </a>
                )}
              </div>

              <div className="mt-2">
                <p className="text-sm text-gray-500">Преподаватель</p>
                <p className="text-base font-semibold">{item.teacher_name}</p>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
