"use client"
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { TEACHERS } from "@/lib/teachers"
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
  const [isApproved, setIsApproved] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)

  const [zoomLink, setZoomLink] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("10:00")

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
    await supabase
      .from("course_signup_requests")
      .update({ status: "rejected" })
      .eq("id", id)

    setRequests((prev) => prev.filter((r) => r.id !== id))
    setIsApproved(false)
    setSelectedRequest(null)
  }

  const handleSendMaterials = async () => {
    if (!selectedRequest || !selectedRequest.user_id) return

    if (!zoomLink || !selectedTeacher || !startDate || !startTime) {
      alert("Заполните все поля!")
      return
    }

    const { data: course } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", selectedRequest.course)
      .single()

    if (!course) {
      alert("Ошибка: курс не найден")
      return
    }

    await supabase.from("user_courses").insert({
      user_id: selectedRequest.user_id,
      course_id: course.id,
    })

    await createScheduleForUser(
      selectedRequest.user_id,
      course.id,
      selectedTeacher,
      startDate,
      startTime,
      zoomLink
    )

    await supabase
      .from("course_signup_requests")
      .delete()
      .eq("id", selectedRequest.id)

    setToastMessage("Материалы успешно отправлены и расписание создано")
    setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id))
    setIsApproved(false)
    setSelectedRequest(null)
    setZoomLink("")
    setSelectedTeacher("")
    setStartDate("")
    setStartTime("10:00")

    setTimeout(() => setToastMessage(null), 4000)
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
                <Button onClick={() => handleApprove(r)} className="bg-green-600 hover:bg-green-700">✅ Подтвердить</Button>
                <Button variant="destructive" onClick={() => handleReject(r.id)}>❌ Отклонить</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isApproved && selectedRequest && (
        <div className="mt-8 p-6 border rounded-lg shadow-sm bg-gray-50 space-y-4">
          <h3 className="text-lg font-bold">Отправка материалов для курса: {selectedRequest.course}</h3>

          <div>
            <label className="block mb-1">Преподаватель:</label>
            <select
              className="w-full border p-2 rounded-md"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Выберите преподавателя</option>
              {TEACHERS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Ссылка на Zoom:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder="https://zoom.us/..."
              value={zoomLink}
              onChange={(e) => setZoomLink(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">Дата начала:</label>
              <input
                type="date"
                className="w-full border p-2 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1">Время начала:</label>
              <input
                type="time"
                className="w-full border p-2 rounded-md"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleSendMaterials} className="bg-primary hover:bg-primary/90 mt-2">
            Отправить материалы
          </Button>
        </div>
      )}

      {toastMessage && (
        <div className="mt-6 p-4 bg-green-600 text-white rounded-lg shadow-sm">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
