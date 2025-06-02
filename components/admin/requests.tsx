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
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [zoomLink, setZoomLink] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("course_signup_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true })

      if (!error && data) setRequests(data)
    }

    fetchRequests()
  }, [])

  const handleReject = async (id: string) => {
    await supabase.from("course_signup_requests").update({ status: "rejected" }).eq("id", id)
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  const handleApprove = async (request: Request) => {
    setSelectedRequest(request)
  }

  const handleConfirm = async () => {
    if (!selectedRequest?.user_id) return

    const courseTitle = selectedRequest.course

    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("title", courseTitle)
      .single()

    if (courseError || !courseData) {
      console.error("Ошибка при получении курса:", courseError)
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
    setToastMessage("Заявка успешно подтверждена, расписание добавлено.")
    setSelectedRequest(null)
    setZoomLink("")
    setScheduleDate("")
    setScheduleTime("")

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

      {selectedRequest && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-4">
          <h3 className="text-lg font-bold mb-2">Подтвердите заявку: {selectedRequest.name}</h3>

          <div>
            <label className="block text-sm font-medium mb-1">Ссылка на Zoom</label>
            <input
              type="text"
              value={zoomLink}
              onChange={(e) => setZoomLink(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="https://zoom.us/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Дата занятия</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Время занятия</label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
            Подтвердить и отправить
          </Button>
        </div>
      )}

      {toastMessage && (
        <div className="mt-4 p-4 bg-green-600 text-white rounded-lg">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
