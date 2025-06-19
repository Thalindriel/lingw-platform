"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { createClient } from "@/lib/supabase/client"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [canResend, setCanResend] = useState(false)
  const [timer, setTimer] = useState(60)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (!canResend && success) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setCanResend(true)
            return 60
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [success, canResend])

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

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })

        if (signUpError) throw signUpError

        if (data?.user) {
          const { error: insertError } = await supabase.from("user_profiles").insert([
            {
              user_id: data.user.id,
              full_name: fullName,
              language_level: "A1",
              streak_days: 0,
              study_hours: 0,
              words_learned: 0,
            },
          ])
          if (insertError) throw insertError

          router.push("/auth/verify")
        }
      } else {
        if (!email || !password) {
          throw new Error("Пожалуйста, заполните все поля")
        }

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) throw signInError

        if (!data.user?.email_confirmed_at) {
          throw new Error("Email не подтвержден. Пожалуйста, проверьте вашу почту.")
        }

        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: false },
        })

        if (otpError) throw otpError

        setSuccess("Ссылка для подтверждения входа отправлена на вашу почту.")
        setCanResend(false)
        setTimer(60)
      }
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        setError("Нет подключения к серверу.")
      } else if (error.message === "User already registered") {
        setError("Пользователь уже зарегистрирован.")
      } else if (error.message === "Invalid login credentials") {
        setError("Неверный email или пароль.")
      } else if (error.message === "Email not confirmed") {
        setError("Подтвердите email.")
      } else if (error.message.includes("password")) {
        setError("Пароль должен содержать не менее 6 символов.")
      } else {
        setError(error.message || "Произошла ошибка.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError(null)
    setSuccess(null)
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      })

      if (otpError) throw otpError

      setSuccess("Ссылка для входа повторно отправлена на вашу почту.")
      setCanResend(false)
      setTimer(60)
    } catch {
      setError("Не удалось отправить ссылку повторно. Попробуйте позже.")
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="fullName">Имя и фамилия</Label>
            <Input
              id="fullName"
              placeholder="Введите ваше имя и фамилию"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12"
          />
        </div>
        <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : type === "login" ? "Войти" : "Зарегистрироваться"}
        </Button>
      </form>

      {type === "login" && (
        <div className="text-center pt-2">
          <Link href="/forgot-password" className="text-sm text-primary underline">
            Забыли пароль?
          </Link>
        </div>
      )}

      {type === "login" && success && !canResend && (
        <p className="text-center text-sm text-muted-foreground">
          Повторно отправить ссылку можно через {timer} сек.
        </p>
      )}
      {type === "login" && canResend && (
        <Button variant="ghost" onClick={handleResend} className="w-full text-primary underline">
          Отправить ссылку повторно
        </Button>
      )}
    </div>
  )
}
