import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { getRandomTeacher } from "@/lib/teachers";
import { getCourseIdByTitle } from "@/lib/utils";

type Request = {
  id: string;
  user_id: string | null;
  course: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

export function AdminRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("course_signup_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Ошибка загрузки заявок:", error);
      } else {
        setRequests(data);
      }
    };

    fetchRequests();
  }, [supabase]);

  const handleApprove = async (request: Request) => {
    const courseId = await getCourseIdByTitle(request.course);
    if (!courseId) {
      alert("Не удалось найти курс.");
      return;
    }

    const { data, error } = await supabase
      .from("user_courses")
      .insert([
        {
          user_id: request.user_id,
          course_id: courseId,
          progress: 0,
          lessons_completed: 0,
          total_lessons: 0,
        },
      ]);

    if (error) {
      console.error("Ошибка при добавлении пользователя в курс:", error);
      return;
    }

    await createScheduleForUser(request.user_id, courseId);

    await supabase.from("course_signup_requests").delete().eq("id", request.id);

    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  };

  const handleReject = async (id: string) => {
    await supabase
      .from("course_signup_requests")
      .update({ status: "rejected" })
      .eq("id", id);

    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Заявки на курс</h1>
      {requests.length === 0 ? (
        <p>Нет новых заявок</p>
      ) : (
        <div>
          {requests.map((request) => (
            <div key={request.id} className="border p-4 rounded-lg mb-4">
              <p><strong>Имя:</strong> {request.name}</p>
              <p><strong>Курс:</strong> {request.course}</p>
              <p><strong>Email:</strong> {request.email}</p>
              <p><strong>Телефон:</strong> {request.phone}</p>

              <div className="mt-4 flex gap-4">
                <Button onClick={() => handleApprove(request)} className="bg-green-600 hover:bg-green-700">Подтвердить</Button>
                <Button onClick={() => handleReject(request.id)} className="bg-red-600 hover:bg-red-700">Отклонить</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
