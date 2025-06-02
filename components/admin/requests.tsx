"use client"
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { createScheduleForUser } from "@/lib/actions/create-schedule"
import { getRandomTeacher } from "@/lib/teachers.tsx"

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
  const [courseMaterials, setCourseMaterials] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
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

  const handleApprove = async (request: Request) => {
    setSelectedRequest(request)
    setIsApproved(true) // Показать форму отправки данных
  }

  const handleReject = async (id: string) => {
    await supabase
      .from("course_signup_requests")
      .update({ status: "rejected" })
      .eq("id", id)

    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  const handleSendMaterials = async () => {
    console.log("Отправка ссылки и материалов...")
    console.log("Zoom-ссылка:", zoomLink)
    console.log("Материалы курса:", courseMaterials)

    setToastMessage("Материалы успешно отправлены!")

    if (selectedRequest) {
      await supabase
        .from("course_signup_requests")
        .delete()
        .eq("id", selectedRequest.id)

      setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id))

      setUserNotification("Ваша заявка принята, учебные материалы успешно отправлены! Пожалуйста, проверьте личный кабинет.")
    }

    setZoomLink("")
    setCourseMaterials("")
    setIsApproved(false)

    setTimeout(() => setToastMessage(null), 3000)
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

      {/* Визуальное  */}
      {isApproved && selectedRequest && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-xl font-bold mb-4">Отправка материалов пользователю</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="zoomLink" className="block text-sm font-medium">
                Ссылка на Zoom:
              </label>
              <input
                id="zoomLink"
                type="text"
                placeholder="Вставьте ссылку на Zoom"
                value={zoomLink}
                onChange={(e) => setZoomLink(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="courseMaterials" className="block text-sm font-medium">
                Обучающие материалы:
              </label>
              <textarea
                id="courseMaterials"
                placeholder="Вставьте обучающие материалы"
                value={courseMaterials}
                onChange={(e) => setCourseMaterials(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <Button onClick={handleSendMaterials} className="bg-primary hover:bg-primary/90">
              Отправить материалы
            </Button>
          </div>
        </div>
      )}

      {/* Всплывающее  */}
      {toastMessage && (
        <div className="mt-4 p-4 bg-green-600 text-white rounded-lg">
          <p>{toastMessage}</p>
        </div>
      )}

      {/* Уведомление  */}
      {userNotification && (
        <div className="mt-4 p-4 bg-blue-600 text-white rounded-lg">
          <p>{userNotification}</p>
        </div>
      )}
    </div>
  )
}
