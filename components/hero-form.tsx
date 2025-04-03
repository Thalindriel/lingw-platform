"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function HeroForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !agreed) {
      return
    }

    setIsSubmitting(true)

    // Имитация отправки данных
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)
    setName("")
    setEmail("")
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h2 className="text-xl font-bold text-white mb-2">Запишитесь на первое бесплатное занятие</h2>
      <p className="text-white/80 text-sm mb-4">
        Познакомимся, проведем тест на уровень знания языка, расскажем как будет проходить обучение
      </p>

      {isSuccess ? (
        <div className="bg-green-500/20 text-white p-4 rounded-md animate-fade-in">
          Спасибо за заявку! Мы свяжемся с вами в ближайшее время.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
              required
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@email.com"
              required
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-gray-800 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {isSubmitting ? "Отправка..." : "Оставить заявку"}
            </Button>
          </div>

          <div className="flex items-center space-x-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-gray-800"
            />
            <label htmlFor="terms" className="text-xs text-white/80">
              Согласие на обработку персональных данных
            </label>
          </div>
        </form>
      )}
    </div>
  )
}

