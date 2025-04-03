"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface CourseSignupFormProps {
  darkMode?: boolean
  title?: string
  subtitle?: string
}

export function CourseSignupForm({ darkMode = false, title = "Запись на курс", subtitle }: CourseSignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !agreed) {
      setError("Пожалуйста, заполните все обязательные поля")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Имитация отправки данных
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSuccess(true)
      setName("")
      setEmail("")
      setPhone("")
      setAgreed(false)
    } catch (err) {
      setError("Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = darkMode
    ? "w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
    : "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"

  const buttonClasses = darkMode
    ? "w-full bg-white text-gray-800 hover:bg-white/90"
    : "w-full bg-primary hover:bg-primary/90 text-white"

  return (
    <div>
      {title && <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : ""}`}>{title}</h3>}
      {subtitle && <p className={`text-sm mb-4 ${darkMode ? "text-white/80" : "text-gray-600"}`}>{subtitle}</p>}

      {isSuccess ? (
        <div
          className={`p-4 rounded-md animate-fade-in ${darkMode ? "bg-green-500/20 text-white" : "bg-green-50 text-green-800"}`}
        >
          Спасибо за заявку! Мы свяжемся с вами в ближайшее время.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className={`p-3 rounded-md mb-4 ${darkMode ? "bg-red-500/20 text-white" : "bg-red-50 text-red-800"}`}>
              {error}
            </div>
          )}

          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
              required
              className={inputClasses}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={inputClasses}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Телефон"
              className={inputClasses}
            />
          </div>

          <div className="flex items-center space-x-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className={
                darkMode ? "border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-gray-800" : ""
              }
            />
            <label htmlFor="terms" className={`text-xs ${darkMode ? "text-white/80" : "text-gray-600"}`}>
              Согласие на обработку персональных данных
            </label>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "500ms" }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`${buttonClasses} transition-all duration-300 transform hover:scale-105 active:scale-95`}
            >
              {isSubmitting ? "Отправка..." : "Оставить заявку"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

