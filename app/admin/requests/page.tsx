"use client"
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { createScheduleForUser } from "@/lib/actions/create-schedule"

type Request = {
  id: string
  user_id: string | null
  course: string
  name: string
  email: string
  phone: string
  created_at: string
}

export default function AdminRequestsPage() {
  const supabase = createClient()
  const [requests, setRequests] = useState<Request[]>([])

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("course_signup_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true })

      if (error) console.error("Ошибка загрузки заявок:", error)
      else setRequests(data)
    }

    fetchRequests()
  }, [])

  const handleApprove = async (request: Request) => {
    if (!request.user_id) {
      alert("Пользователь не авторизован — невозможно привязать курс.")
      return
    }

    const courseId = await getCourseIdByTitle(request.course)
    if (!courseId) return alert("Не удалось найти курс в базе.")

    await supabase.from("user_courses").insert({
      user_id: request.user_id,
      course_id: courseId,
      progress: 0,
      lessons_completed: 0,
      total_lessons: 0
    })

    await createScheduleForUser(request.user_id, courseId)

    await supabase.from("course_signup_requests").delete().eq("id", request.id)

    setRequests((prev) => prev.filter((r) => r.id !== request.id))
  }

  const handleReject = async (id: string) => {
    await supabase
      .from("course_signup_requests")
      .update({ status: "rejected" })
      .eq("id", id)

    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  const getCourseIdByTitle = async (title: string) => {
    const { data, error } = await supabase
      .from("courses")
      .select("id")
      .eq("title", title)
      .single()

    if (error) {
      console.error("Ошибка получения курса:", error)
      return null
    }

    return data.id
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Заявки на запись</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">Нет новых заявок.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((r) => (
            <div key={r.id} className="p-4 border rounded-lg shadow-sm">
              <p>
                <strong>Курс:</strong> {r.course}
              </p>
              <p>
                <strong>Имя:</strong> {r.name}
              </p>
              <p>
                <strong>Email:</strong> {r.email}
              </p>
              {r.phone && (
                <p>
                  <strong>Телефон:</strong> {r.phone}
                </p>
              )}
              <div className="mt-4 flex gap-4">
                <Button onClick={() => handleApprove(r)} className="bg-green-600 hover:bg-green-700">
                  ✅ Подтвердить
                </Button>
                <Button variant="destructive" onClick={() => handleReject(r.id)}>
                  ❌ Отклонить
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
