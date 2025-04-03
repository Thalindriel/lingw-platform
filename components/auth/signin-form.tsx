"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/providers/supabase-provider"
// Обновим импорты иконок социальных сетей
import Image from "next/image"

export function SignInForm() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Redirect to dashboard
      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>}

      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Почта"
          className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Пароль"
          className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors disabled:opacity-70"
      >
        {isLoading ? "Вход..." : "Войти в аккаунт"}
      </button>
      {/* Заменим кнопки социальных сетей */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        <button className="p-2 rounded-full border">
          <Image src="/assets/img/icons/google-icon.svg" alt="Google" width={24} height={24} />
        </button>
        <button className="p-2 rounded-full border">
          <Image src="/assets/img/icons/apple_icon_registr.svg" alt="Apple" width={24} height={24} />
        </button>
        <button className="p-2 rounded-full border">
          <Image src="/assets/img/icons/telegram-icon.svg" alt="Telegram" width={24} height={24} />
        </button>
      </div>
    </form>
  )
}

