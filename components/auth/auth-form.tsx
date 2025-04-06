"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { supabase } from "@/lib/supabase/client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        console.log("Пользователь уже авторизован, перенаправляем на дашборд")
        window.location.href = "/dashboard"
      }
    }
    
    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (type === "register") {
        if (!email || !password || !fullName) {
          throw new Error("Пожалуйста, заполните все поля")
        }

        console.log("Начинаем регистрацию пользователя:", { email, fullName })

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (signUpError) {
          console.error("Ошибка при регистрации:", signUpError)
          throw signUpError
        }

        console.log("Регистрация успешна, данные пользователя:", data?.user?.id)

        if (data?.user) {
          try {
            console.log("Создаем профиль для пользователя:", data.user.id)

            const { data: profileData, error: profileError } = await supabase
              .from("user_profiles")
              .insert([
                {
                  user_id: data.user.id,
                  full_name: fullName,
                  language_level: "A1",
                  streak_days: 0,
                  study_hours: 0,
                  words_learned: 0,
                },
              ])
              .select()

            if (profileError) {
              console.error("Ошибка при создании профиля:", profileError)
            } else {
              console.log("Профиль успешно создан:", profileData)
            }
          } catch (profileErr) {
            console.error("Исключение при создании профиля:", profileErr)
          }

          setSuccess("Регистрация успешна! Проверьте вашу почту для подтверждения.")
          setTimeout(() => {
            router.push("/login")
          }, 3000)
        }
      } else {
        if (!email || !password) {
          throw new Error("Пожалуйста, заполните все поля")
        }

        console.log("Начинаем авторизацию пользователя:", { email })

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          console.error("Ошибка при авторизации:", signInError)
          throw signInError
        }

        console.log("Авторизация успешна:", data)

        if (data.session) {
          setSuccess("Авторизация успешна! Перенаправляем...")
          
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1000)
        } else {
          throw new Error("Не удалось создать сессию")
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error)

      if (error.message === "Failed to fetch") {
        setError(
          "Не удалось подключиться к серверу. Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова.",
        )
      } else if (error.message === "User already registered") {
        setError("Пользователь с таким email уже зарегистрирован")
      } else if (error.message === "Invalid login credentials") {
        setError("Неверный email или пароль")
      } else if (error.message === "Email not confirmed") {
        setError("Email не подтвержден. Пожалуйста, проверьте вашу почту для подтверждения.")
      } else if (error.message.includes("password")) {
        setError("Пароль должен содержать не менее 6 символов")
      } else {
        setError(error.message || "Произошла ошибка. Пожалуйста, попробуйте снова.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSocialAuth = async (provider: "google" | "apple" | "telegram") => {
  }

  return (
  )
}
