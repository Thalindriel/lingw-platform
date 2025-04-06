"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AuthForm } from "@/components/auth/auth-form"
import { supabase } from "@/lib/supabase/client"

export default function Login() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        
        if (data.session) {
          console.log("Пользователь уже авторизован, перенаправляем на дашборд")
          window.location.href = "/dashboard"
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center">
              <Image src="/assets/img/logo_icon.svg" alt="LingW" width={40} height={40} />
              <span className="text-xl font-bold ml-2">LingW</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold">Вход в LingW</h2>
        </div>

        <AuthForm type="login" />

        <div className="text-center mt-4">
          <p className="text-sm">
            Еще нет аккаунта?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
