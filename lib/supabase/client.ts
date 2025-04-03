import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Получаем URL и ключ из переменных окружения
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Проверяем наличие переменных окружения
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables. Authentication will not work.")
}

// Создаем и экспортируем клиент Supabase с дополнительными настройками
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  // Добавляем глобальные обработчики ошибок
  global: {
    fetch: (...args) => {
      return fetch(...args).catch((err) => {
        console.error("Supabase fetch error:", err)
        throw err
      })
    },
  },
})

