"use client"
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { TEACHERS } from "@/lib/teachers"

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
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")

  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [userNotification, setUserNotification] = useState<string | null>(null)

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
    console.log("Обработка заявки...")

    if (!selectedRequest?.user_id || !selectedRequest.course) {
      alert("Некорректные данные заявки")
      return
    }

    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", selectedRequest.course.trim())

    if (courseError || !courseData || courseData.length === 0) {
      console.error("Курс не найден:", courseError)
      alert("Курс не найден")
      return
    }

    const courseId = courseData[0].id

    
    const { count: totalLessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("id", { count: "exact", head: true })
      .eq("course_id", courseId)

      if (lessonsError) {
      console.error("Ошибка при подсчёте уроков:", lessonsError)
        alert("Ошибка при подсчёте количества уроков")
        return
      }

const { error: insertUserCourseError } = await supabase.from("user_courses").insert({
  user_id: selectedRequest.user_id,
  course_id: courseId,
  progress: 0,
  lessons_completed: 0,
  total_lessons: totalLessons || 0,
})


    if (insertUserCourseError) {
      console.error("Ошибка user_courses:", insertUserCourseError)
      alert("Ошибка при добавлении курса")
      return
    }

    const { error: insertScheduleError } = await supabase.from("schedules").insert({
      user_id: selectedRequest.user_id,
      course_id: courseId,
      lesson_id: null,
      zoom_link: zoomLink,
      date: selectedDate,
      time: selectedTime,
      teacher_name: selectedTeacher || "Преподаватель",
      is_deadline: false,
    })

    if (insertScheduleError) {
      console.error("Ошибка schedules:", insertScheduleError)
      alert("Ошибка при создании расписания")
      return
    }

    const { error: deleteError } = await supabase
      .from("course_signup_requests")
      .delete()
      .eq("id", selectedRequest.id)

    if (deleteError) {
      console.error("Ошибка при удалении заявки:", deleteError)
      alert("Ошибка при удалении заявки")
      return
    }

    setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id))
    setToastMessage("Материалы успешно отправлены!")
    setUserNotification("Заявка одобрена, материалы и расписание отправлены.")

    // Сброс
    setZoomLink("")
    setSelectedDate("")
    setSelectedTime("")
    setSelectedTeacher("")
    setIsApproved(false)
    setSelectedRequest(null)

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
              <p><strong>Курс (slug):</strong> {r.course}</p>
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
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-bold mb-4">Отправка материалов</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Ссылка на Zoom:</label>
              <input
                type="text"
                value={zoomLink}
                onChange={(e) => setZoomLink(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Дата:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Время:</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Преподаватель:</label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Выберите преподавателя</option>
                {TEACHERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <Button onClick={handleSendMaterials} className="bg-primary hover:bg-primary/90">
              📩 Отправить материалы
            </Button>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="mt-4 p-4 bg-green-600 text-white rounded-lg">
          <p>{toastMessage}</p>
        </div>
      )}

      {userNotification && (
        <div className="mt-4 p-4 bg-blue-600 text-white rounded-lg">
          <p>{userNotification}</p>
        </div>
      )}
    </div>
  )
}
