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

type LessonForm = {
  date: string
  time: string
  zoom_link: string
  teacher: string
}

export default function AdminRequestsPage() {
  const supabase = createClient()
  const [requests, setRequests] = useState<Request[]>([])
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isApproved, setIsApproved] = useState(false)

  const [lessons, setLessons] = useState<LessonForm[]>([
    { date: "", time: "", zoom_link: "", teacher: "" },
  ])

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

  const handleAddLesson = () => {
    setLessons((prev) => [...prev, { date: "", time: "", zoom_link: "", teacher: "" }])
  }

  const handleLessonChange = (index: number, field: keyof LessonForm, value: string) => {
    setLessons((prev) =>
      prev.map((lesson, i) =>
        i === index ? { ...lesson, [field]: value } : lesson
      )
    )
  }

  const handleSendMaterials = async () => {
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

    const { data: lessonsList, count: totalLessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("id", { count: "exact" })
      .eq("course_id", courseId)

    if (lessonsError) {
      console.error("Ошибка при подсчёте уроков:", lessonsError)
      alert("Ошибка при подсчёте количества уроков")
      return
    }

    await supabase.from("user_courses").insert({
      user_id: selectedRequest.user_id,
      course_id: courseId,
      progress: 0,
      lessons_completed: 0,
      total_lessons: totalLessons || 0,
    })

    const lessonsToInsert = lessons.map((lesson) => ({
      user_id: selectedRequest.user_id,
      course_id: courseId,
      lesson_id: null,
      zoom_link: lesson.zoom_link,
      date: lesson.date,
      time: lesson.time,
      teacher_name: lesson.teacher || "Преподаватель",
      is_deadline: false,
    }))

    const { error: insertError } = await supabase
      .from("schedules")
      .insert(lessonsToInsert)

    if (insertError) {
      console.error("Ошибка при вставке расписания:", insertError)
      alert("Ошибка при создании расписания")
      return
    }

    await supabase.from("course_signup_requests").delete().eq("id", selectedRequest.id)

    setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id))
    setIsApproved(false)
    setSelectedRequest(null)
    setLessons([{ date: "", time: "", zoom_link: "", teacher: "" }])
    setToastMessage("Материалы успешно отправлены!")

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
                <Button onClick={() => handleApprove(r)} className="bg-green-600 hover:bg-green-700">✅ Подтвердить</Button>
                <Button variant="destructive" onClick={() => handleReject(r.id)}>❌ Отклонить</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isApproved && selectedRequest && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-bold mb-4">Назначить занятия</h3>

          {lessons.map((lesson, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 mb-4 p-4 border rounded-md bg-white">
              <div>
                <label className="block text-sm font-medium mb-1">Дата:</label>
                <input
                  type="date"
                  value={lesson.date}
                  onChange={(e) => handleLessonChange(index, "date", e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Время:</label>
                <input
                  type="time"
                  value={lesson.time}
                  onChange={(e) => handleLessonChange(index, "time", e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Ссылка на Zoom:</label>
                <input
                  type="text"
                  value={lesson.zoom_link}
                  onChange={(e) => handleLessonChange(index, "zoom_link", e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Преподаватель:</label>
                <select
                  value={lesson.teacher}
                  onChange={(e) => handleLessonChange(index, "teacher", e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Выберите преподавателя</option>
                  {TEACHERS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <Button onClick={handleAddLesson} className="mb-4 bg-blue-500 hover:bg-blue-600">➕ Добавить занятие</Button>
          <Button onClick={handleSendMaterials} className="bg-primary hover:bg-primary/90">📩 Отправить материалы</Button>
        </div>
      )}

      {toastMessage && (
        <div className="mt-4 p-4 bg-green-600 text-white rounded-lg">
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  )
}
