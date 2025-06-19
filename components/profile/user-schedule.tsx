"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ScheduleItem {
  id: string;
  course_id: string;
  course_title?: string;
  teacher_name: string;
  zoom_link: string;
  date: string;
  time: string;
}

interface GroupedSchedule {
  course_id: string;
  course_title: string;
  items: ScheduleItem[];
}

export default function UserSchedule() {
  const [groupedSchedules, setGroupedSchedules] = useState<GroupedSchedule[] | null>(null);
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
          .select(`id, user_id, course_id, date, time, teacher_name, zoom_link, courses(title)`) // join with course title
          .eq("user_id", session.user.id)
          .order("date", { ascending: true });

        if (error) {
          console.error("Ошибка загрузки расписания:", error);
          return;
        }

        const grouped = new Map<string, GroupedSchedule>();

        for (const item of data || []) {
          const course_id = item.course_id ?? "none";
          const title = item.courses?.title || "Без названия";
          if (!grouped.has(course_id)) {
            grouped.set(course_id, {
              course_id,
              course_title: title,
              items: [],
            });
          }

          grouped.get(course_id)?.items.push({
            id: item.id,
            course_id,
            course_title: title,
            date: item.date,
            time: item.time,
            teacher_name: item.teacher_name ?? "Преподаватель",
            zoom_link: item.zoom_link ?? "—",
          });
        }

        setGroupedSchedules(Array.from(grouped.values()));
      } catch (err) {
        console.error("Непредвиденная ошибка при загрузке расписания:", err);
      }
    };

    fetchSchedule();
  }, [supabase]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Расписание занятий</h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
        Ваши занятия проходят по гибкому графику. Если что-то не подходит — <a href="/support" className="text-blue-600 hover:underline">свяжитесь с нами</a>.
      </p>

      {groupedSchedules === null ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : groupedSchedules.length === 0 ? (
        <p className="text-gray-500">Нет назначенных занятий.</p>
      ) : (
        <div className="space-y-10">
          {groupedSchedules.map((group) => (
            <div key={group.course_id}>
              <h2 className="text-xl font-bold mb-4">{group.course_title}</h2>
              <div className="grid gap-4">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border shadow-sm rounded-xl p-4 flex flex-col gap-2"
                  >
                    <div className="text-sm text-gray-500">
                      {item.date} в {item.time}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Преподаватель:</span> {item.teacher_name}
                    </div>
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
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
