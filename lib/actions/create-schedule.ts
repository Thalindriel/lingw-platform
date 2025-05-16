"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getRandomTeacher } from "@/lib/teachers";

export async function createScheduleForUser(userId: string, courseId: string) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      get: (key: string) => cookies().get(key)?.value,
      set: (key: string, value: string, options?: any) => cookies().set(key, value, options),
      remove: (key: string, options?: any) => cookies().delete(key, options),
    }
  );

  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, title")
    .eq("course_id", courseId)
    .order("order_number", { ascending: true });

  if (error || !lessons || lessons.length === 0) {
    console.error("Ошибка загрузки уроков курса:", error);
    return;
  }

  const today = new Date();

  const scheduleEntries = lessons.map((lesson, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + 1 + index);

    return {
      user_id: userId,
      course_id: courseId,
      lesson_id: lesson.id,
      teacher_name: getRandomTeacher(),
      zoom_link: "https://zoom.us/meeting-link", 
      date: date.toISOString().split("T")[0],  
      time: "10:00",
      is_deadline: false,
    };
  });

  console.log("Проверка scheduleEntries:", scheduleEntries);

  const { error: insertError } = await supabase
    .from("schedules")
    .insert(scheduleEntries);

  if (insertError) {
    console.error("Ошибка вставки расписания:", insertError);
  }
}
