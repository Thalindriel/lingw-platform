"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type ScheduleItem = {
  id: string;
  teacher_name: string;
  zoom_link: string;
  date: string;
  time: string;
};

export default function UserSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSchedule = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data, error } = await supabase
        .from("schedules")
        .select("id, teacher_name, zoom_link, date, time")
        .eq("user_id", session.user.id)
        .order("date", { ascending: true });

      if (error) {
        console.error("Ошибка при загрузке расписания:", error);
        return;
      }

      const safeData = (data ?? []).map((item) => ({
        id: item.id,
        teacher_name: item.teacher_name ?? "Преподаватель",
        zoom_link: item.zoom_link ?? "—",
        date: item.date ?? "—",
        time: item.time ?? "—",
      }));

      setSchedule(safeData);
    };

    fetchSchedule();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Моё расписание</h1>

        {schedule.length === 0 ? (
          <p>Нет назначенных занятий.</p>
        ) : (
          <ul className="space-y-4">
            {schedule.map((item) => (
              <li key={item.id}>
                <p><strong>Дата:</strong> {item.date}</p>
                <p><strong>Время:</strong> {item.time}</p>
                <p><strong>Преподаватель:</strong> {item.teacher_name}</p>
                <p><strong>Ссылка:</strong> {item.zoom_link !== "—" ? (
                  <a href={item.zoom_link} target="_blank" rel="noreferrer">{item.zoom_link}</a>
                ) : "—"}</p>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
