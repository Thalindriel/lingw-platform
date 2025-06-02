"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ScheduleItem = {
  id: string;
  teacher_name: string;
  zoom_link: string;
  date: string;
  time: string;
  lesson_title: string;
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
        .select(`
          id,
          teacher_name,
          zoom_link,
          date,
          time,
          lesson:lesson_id (
            title
          )
        `)
        .eq("user_id", session.user.id)
        .order("date", { ascending: true });

      if (error) {
        console.error("Ошибка при загрузке расписания:", error);
        return;
      }

      const formatted = data.map((item: any) => ({
        id: item.id,
        teacher_name: item.teacher_name || "Преподаватель",
        zoom_link: item.zoom_link || "—",
        date: item.date || "—",
        time: item.time || "—",
        lesson_title: item.lesson?.title || "Без названия",
      }));

      setSchedule(formatted);
    };

    fetchSchedule();
  }, []);

  return (
    <div>
      <h1>Моё расписание</h1>
      {schedule.length === 0 ? (
        <p>Нет назначенных занятий.</p>
      ) : (
        <ul>
          {schedule.map((item) => (
            <li key={item.id}>
              <p><strong>Дата:</strong> {item.date}</p>
              <p><strong>Время:</strong> {item.time}</p>
              <p><strong>Урок:</strong> {item.lesson_title}</p>
              <p><strong>Преподаватель:</strong> {item.teacher_name}</p>
              <p><strong>Ссылка на Zoom:</strong> <a href={item.zoom_link} target="_blank">{item.zoom_link}</a></p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
