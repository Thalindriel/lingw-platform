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
  const [rawData, setRawData] = useState<any[]>([]);
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

      if (!Array.isArray(data)) {
        console.error("Ожидался массив, получено:", data);
        return;
      }

      const safeData = data.map((item) => ({
        id: item.id ?? crypto.randomUUID(),
        teacher_name: item.teacher_name ?? "Преподаватель",
        zoom_link: item.zoom_link ?? "—",
        date: item.date ?? "—",
        time: item.time ?? "—",
      }));

      setRawData(data);
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
          <>
            <ul className="space-y-4">
              {schedule.map((item, index) => {
                if (!item || typeof item !== "object") return null;

                const { id, date, time, teacher_name, zoom_link } = item;

                return (
                  <li key={id || index} className="border p-4 rounded">
                    <p><strong>Дата:</strong> {date}</p>
                    <p><strong>Время:</strong> {time}</p>
                    <p><strong>Преподаватель:</strong> {teacher_name}</p>
                    <p><strong>Ссылка:</strong>{" "}
                      {zoom_link && zoom_link !== "—" ? (
                        <a href={zoom_link} target="_blank" rel="noreferrer">{zoom_link}</a>
                      ) : "—"}
                    </p>
                  </li>
                );
              })}
            </ul>

            {/* Отладочный JSON */}
            <div className="mt-8 bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">Debug (Raw Supabase Data):</h2>
              <pre className="text-sm overflow-x-auto">{JSON.stringify(rawData, null, 2)}</pre>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
