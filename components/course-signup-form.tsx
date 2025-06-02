"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { createBrowserClient } from "@supabase/ssr"

interface CourseSignupFormProps {
  open: boolean
  onClose: () => void
  courseTitle?: string
  courseSlug?: string
  darkMode?: boolean
}

export function CourseSignupForm({
  open,
  onClose,
  courseTitle = "Английский язык",
  courseSlug = "trial",
  darkMode = false
}: CourseSignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !agreed) {
      setError("Пожалуйста, заполните все обязательные поля")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      const { error: insertError } = await supabase.from("course_signup_requests").insert({
        user_id: session?.user?.id || null,
        course: courseSlug,
        name,
        email,
        phone
      })

      if (insertError) throw insertError

      setIsSuccess(true)
      setName("")
      setEmail("")
      setPhone("")
      setAgreed(false)
    } catch {
      setError("Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = darkMode
    ? "w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md"
    : "w-full px-4 py-2 border border-gray-300 rounded-md"

  const buttonClasses = darkMode
    ? "w-full bg-white text-gray-800 hover:bg-white/90"
    : "w-full bg-primary hover:bg-primary/90 text-white"

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Запись на "{courseTitle}"</DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className={`p-4 rounded-md ${darkMode ? "bg-green-500/20 text-white" : "bg-green-50 text-green-800"}`}>
            Спасибо за заявку! Мы свяжемся с вами в ближайшее время.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className={`p-3 rounded-md ${darkMode ? "bg-red-500/20 text-white" : "bg-red-50 text-red-800"}`}>
                {error}
              </div>
            )}

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
              required
              className={inputClasses}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={inputClasses}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Телефон"
              className={inputClasses}
            />

            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm">
                Согласие на обработку персональных данных
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`${buttonClasses} transition duration-300 transform hover:scale-105 active:scale-95`}
            >
              {isSubmitting ? "Отправка..." : "Оставить заявку"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
