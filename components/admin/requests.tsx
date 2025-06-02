"use client"
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { getRandomTeacher } from "@/lib/teachers"

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
  const [isApproved, setIsApproved] = useState(false)
  const [zoomLink, setZoomLink] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

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

  const handleApprove = (request: Request) => {
    setSelectedRequest(request)
    setIsApproved(true)
  }

  const handleReject = async (id: string) => {
    await supabase.from("course_signup_requests").update({ status: "rejected" }).eq("id", id)

    setRequests((prev) => prev.filter((r) => r.id !== id))

    if (selectedRequest?.id === id) {
      setSelectedRequest(null)
      setIsApproved(false)
      setZoomLink("")
      setScheduleDate("")
      setScheduleTime("")
    }

    setToastMessage("Заявка отклонена.")
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleConfirm = async () => {
    if (!selectedRequest?.user_id) return

    const courseTitle = selectedRequest.course

    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", courseTitle)
      .single()

    if (courseError || !courseData) {
      console.error("Ошибка при получении курса:", courseError)
      setToastMessage("Ошибка: курс не найден")
      setTimeout(() => setToastMessage(null), 3000)
      return
    }

    const courseId = courseData.id

    await supabase.from("user_courses").insert({
      user_id: selectedRequest.user_id,
      course_id: courseId,
      progress: 0,
      lessons_completed: 0,
      total_lessons: 0,
    })

    await supabase.from("schedules").insert({
      user_id: selectedRequest.user_id,
      course_id: courseId,
      zoom_link: zoomLink,
      date: scheduleDate,
      time: scheduleTime,
      teacher_name: getRandomTeacher(),
    })

    await supabase.from("course_signup_requests").delete().eq("id", selectedRequest.id)

    setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id))

    setSelectedRequest(null)
    setIsApproved(false)
    setZoomLink("")
    setScheduleDate("")
    setScheduleTime("")

    setToastMessage("Заявка подтверждена, курс добавлен и расписание создано.")
    setTimeout(() => setToastMessage(null), 3000)
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
              <p><strong>Курс:</strong> {r.course}</p>
              <p><strong>Имя:</strong> {r.name}</p>
              <p><strong>Email:</strong> {r.email}</p>
              {r.phone && <p><strong>Телефон:</strong> {r.phone}</p>}

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

      {isApproved && selectedRequest && requests.find(r => r.id === selectedRequest.id) && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Отправка данных пользователю</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Ссылка на Zoom</label>
              <input
                type="text"
                value={zoomLink}
                onChange={(e) => setZoomLink(e.target.value)}
                placeholder="https://zoom.us/..."
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Дата занятия</label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Время</label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
              Отправить материалы и добавить курс
            </Button>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
