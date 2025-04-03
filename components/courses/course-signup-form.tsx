"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface CourseSignupFormProps {
  courseId: string
  title?: string
  subtitle?: string
  buttonText?: string
  darkMode?: boolean
}

export function CourseSignupForm({
  courseId,
  title = "Готовы начать обучение?",
  subtitle = "Заполните форму и мы свяжемся с вами в ближайшее время!",
  buttonText = "Оставить заявку",
  darkMode = false,
}: CourseSignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !agreed) {
      setError("Пожалуйста, заполните все обязательные поля")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
      setName("")
      setEmail("")
      setPhone("")
      setAgreed(false)
    } catch (err: any) {
      console.error("Error submitting form:", err.message)
      setError("Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  const textColor = darkMode ? "text-white" : "text-gray-800"
  const subtitleColor = darkMode ? "text-white/80" : "text-gray-600"
  const inputBgColor = darkMode ? "bg-slate-600 border-slate-500" : "bg-white border-gray-300"

  return (
    <div className={`rounded-lg ${darkMode ? "bg-slate-700" : ""}`}>
      {title && (
        <div className="mb-4 animate-slide-up">
          <h3 className={`text-xl font-extrabold ${textColor} drop-shadow-sm`}>{title}</h3>
          <p className={`text-sm ${subtitleColor} font-light`}>{subtitle}</p>
        </div>
      )}

      {success ? (
        <div
          className={`p-4 rounded-lg ${darkMode ? "bg-green-800/20 text-green-100" : "bg-green-50 text-green-800"} animate-fade-in`}
        >
          Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              className={`p-3 rounded-lg mb-4 ${darkMode ? "bg-red-800/20 text-red-100" : "bg-red-50 text-red-800"} animate-fade-in`}
            >
              {error}
            </div>
          )}

          <div className="space-y-3">
            <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <input
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${inputBgColor} text-gray-800 placeholder:text-gray-500 h-12 transition-all duration-300 focus:shadow-md`}
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <input
                placeholder="email@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${inputBgColor} text-gray-800 placeholder:text-gray-500 h-12 transition-all duration-300 focus:shadow-md`}
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
              <input
                placeholder="+7(___)___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${inputBgColor} text-gray-800 placeholder:text-gray-500 h-12 transition-all duration-300 focus:shadow-md`}
              />
            </div>

            <div className="flex items-center space-x-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className={darkMode ? "border-slate-500 data-[state=checked]:bg-primary" : ""}
              />
              <label htmlFor="terms" className={`text-xs ${darkMode ? "text-white/80" : "text-gray-600"} font-light`}>
                Соглашаюсь с политикой конфиденциальности и даю согласие на обработку персональных данных
              </label>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "500ms" }}>
              <Button
                type="submit"
                className="w-full h-12 font-medium bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
                disabled={loading}
              >
                {loading ? "Отправка..." : buttonText}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

