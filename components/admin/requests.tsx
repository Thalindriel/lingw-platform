"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { TEACHERS } from "@/lib/teachers";

export default function AdminRequestsPage() {
  const supabase = createClient();
  const [requests, setRequests] = useState<any[]>([]);
  const [isApproved, setIsApproved] = useState(false);
  const [zoomLink, setZoomLink] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("course_signup_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true });

      if (!error && data) setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleApprove = (request: any) => {
    setSelectedRequest(request);
    setIsApproved(true);
  };

  const handleReject = async (id: string) => {
    await supabase
      .from("course_signup_requests")
      .update({ status: "rejected" })
      .eq("id", id);

    setRequests((prev) => prev.filter((r) => r.id !== id));
    setIsApproved(false);
    setSelectedRequest(null);
  };

  const handleSendMaterials = async () => {
    if (!selectedRequest || !selectedRequest.user_id) return;

    const courseTitle = selectedRequest.course;
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .filter("title", "eq", courseTitle);

    if (courseError || !courseData || courseData.length === 0) {
      alert("Ошибка: курс не найден.");
      return;
    }

    const courseId = courseData[0].id;

    await supabase.from("user_courses").insert({
      user_id: selectedRequest.user_id,
      course_id: courseId,
      progress: 0,
      lessons_completed: 0,
      total_lessons: 0,
    });

    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("id")
      .eq("course_id", courseId)
      .order("order_number", { ascending: true });

    if (!lessons || lessonsError) {
      alert("Ошибка загрузки уроков.");
      return;
    }

    const today = new Date();
    const scheduleEntries = lessons.map((lesson, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index + 1);

      return {
        user_id: selectedRequest.user_id,
        course_id: courseId,
        lesson_id: lesson.id,
        teacher_name: selectedTeacher,
        zoom_link: zoomLink,
        date: date.toISOString().split("T")[0],
        time: selectedTime || "10:00",
        is_deadline: false,
      };
    });

    await supabase.from("schedules").insert(scheduleEntries);
    await supabase
      .from("course_signup_requests")
      .update({ status: "approved" })
      .eq("id", selectedRequest.id);

    setToastMessage("Материалы и расписание успешно отправлены!");
    setRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id));
    setSelectedRequest(null);
    setZoomLink("");
    setSelectedTeacher("");
    setSelectedTime("");
    setIsApproved(false);

    setTimeout(() => setToastMessage(null), 3000);
  };

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
        <div className="mt-8 p-6 border rounded-lg bg-gray-50 space-y-4">
          <h3 className="text-xl font-bold">Назначить расписание</h3>

          <div>
            <label className="block mb-1">Ссылка на Zoom</label>
            <input
              type="text"
              value={zoomLink}
              onChange={(e) => setZoomLink(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="https://zoom.us/..."
            />
          </div>

          <div>
            <label className="block mb-1">Время урока</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Преподаватель</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Выберите преподавателя</option>
              {TEACHERS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <Button className="bg-primary hover:bg-primary/90" onClick={handleSendMaterials}>
            Отправить материалы
          </Button>
        </div>
      )}

      {toastMessage && (
        <div className="mt-6 p-4 bg-green-600 text-white rounded-lg">
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
