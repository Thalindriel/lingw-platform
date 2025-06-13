"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ScheduleItem = {
  id: string;
  teacher_name: string;
  zoom_link: string;
  date: string;
  time: string;
};

export default function UserSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
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
          console.error("Ошибка загрузки расписания:", error);
          return;
        }

        const normalized = (data ?? []).map((item) => ({
          id: item.id || crypto.randomUUID(),
          teacher_name: item.teacher_name ?? "Преподаватель",
          zoom_link: item.zoom_link ?? "—",
          date: item.date ?? "—",
          time: item.time ?? "—",
        }));

        setSchedule(normalized);
      } catch (err) {
        console.error("Непредвиденная ошибка при загрузке расписания:", err);
      }
    };

    fetchSchedule();
  }, [supabase]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Расписание занятий</h1>
      {schedule === null ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : schedule.length === 0 ? (
        <p className="text-gray-500">Нет назначенных занятий.</p>
      ) : (
        <div className="grid gap-6">
          {schedule.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm border rounded-xl p-6 flex flex-col gap-2"
            >
              <div className="text-sm text-gray-500">{item.date} в {item.time}</div>
              <div className="text-lg font-semibold">{item.teacher_name}</div>
              <div>
                {item.zoom_link !== "—" ? (
                  <a
                    href={item.zoom_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Перейти к занятию
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">Ссылка отсутствует</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
