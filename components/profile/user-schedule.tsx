"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function UserSchedule() {
  useEffect(() => {
    const test = async () => {
      console.log("🧪 useEffect запустился");

      try {
        const supabase = createClient();
        console.log("Supabase client создан");

        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Сессия получена:", session);

        const { data, error } = await supabase
          .from("schedules")
          .select("*")
          .eq("user_id", session?.user.id);
        console.log("Данные:", data);
        if (error) console.error("Ошибка запроса:", error);
      } catch (err) {
        console.error("Ошибка в useEffect:", err);
      }
    };

    test();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Тест отладки</h1>
        <p>Проверь консоль разработчика (DevTools).</p>
      </main>
      <Footer />
    </div>
  );
}
