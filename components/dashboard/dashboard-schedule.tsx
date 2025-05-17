"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ScheduleItem {
  id: string
  date: string
  time: string
  lesson_title: string
  course_title: string
  teacher_name: string
  is_deadline: boolean
}

interface DashboardScheduleProps {
  userId: string
}

export function DashboardSchedule({ userId }: DashboardScheduleProps) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function loadSchedule() {
      try {
        const today = new Date().toISOString().split("T")[0]

        const { data, error } = await supabase
          .from("schedules")
          .select(`
            id,
            date,
            time,
            is_deadline,
            lessons (
              title
            ),
            courses (
              title
            ),
            teacher_name
          `)
          .eq("user_id", userId)
          .gte("date", today)
          .order("date", { ascending: true })
          .order("time", { ascending: true })
          .limit(3)

        if (error) throw error

        if (data) {
          const formattedItems = data.map((item) => ({
            id: item.id,
            date: item.date,
            time: item.time,
            lesson_title: item.lessons?.title || "Урок",
            course_title: item.courses?.title || "Курс",
            teacher_name: item.teacher_name,
            is_deadline: item.is_deadline,
          }))

          setScheduleItems(formattedItems)
        }
      } catch (error: any) {
        console.error("Error loading schedule:", error.message)
      } finally {
        setLoading(false)
      }
    }

    loadSchedule() }, [userId])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", weekday: "long" }
    return date.toLocaleDateString("ru-RU", options)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm flex justify-center items-center h-40">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Расписание</h2>
        <Button variant="outline" size="sm">
          <Link href="/schedule">Полное расписание</Link>
        </Button>
      </div>

      {scheduleItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">У вас нет запланированных занятий</p>
          <Button className="bg-primary hover:bg-primary/90">
            <Link href="/schedule/add">Добавить занятие</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {scheduleItems.map((item) => (
            <div key={item.id} className="border-l-2 border-primary pl-4">
              <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold">{item.time}</p>
                    <p className="text-gray-700">{item.lesson_title}</p>
                    <p className="text-sm text-gray-500">{item.course_title}</p>
                  </div>
                  <Badge variant={item.is_deadline ? "destructive" : "outline"}>
                    {item.is_deadline ? "Дедлайн" : "Занятие"}
                  </Badge>
                </div>

                {!item.is_deadline && (
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <span className="mr-2">👤</span>
                    <span>{item.teacher_name}</span>
                  </div>
                )}

                <div className="mt-4">
                  <Button
                    size="sm"
                    className={item.is_deadline ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"}
                  >
                    {item.is_deadline ? "Сдать работу" : "Присоединиться"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
