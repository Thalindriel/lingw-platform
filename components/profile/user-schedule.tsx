"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function UserSchedule() {
  const [rawData, setRawData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSchedule = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setError("Нет сессии");
        return;
      }

      const { data, error } = await supabase
        .from("schedules")
        .select("*")
        .eq("user_id", session.user.id)
        .order("date", { ascending: true });

      if (error) {
        setError("Ошибка Supabase: " + error.message);
        return;
      }

      if (!Array.isArray(data)) {
        setError("Получен не массив");
        return;
      }

      setRawData(data);
      console.log("RAW DATA:", data);
    };

    fetchSchedule();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Отладка расписания</h1>

        {error && (
          <p className="text-red-600 font-medium mb-4">
            Ошибка: {error}
          </p>
        )}

        {rawData === null ? (
          <p>Загрузка...</p>
        ) : (
          <pre className="bg-gray-100 text-sm p-4 rounded overflow-x-auto max-w-full">
            {JSON.stringify(rawData, null, 2)}
          </pre>
        )}
      </main>

      <Footer />
    </div>
  );
}
