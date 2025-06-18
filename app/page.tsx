"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createBrowserClient } from "@supabase/ssr"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Поля пробной записи
  const [trialName, setTrialName] = useState("")
  const [trialPhone, setTrialPhone] = useState("")
  const [trialEmail, setTrialEmail] = useState("")
  const [trialSuccess, setTrialSuccess] = useState(false)
  const [trialError, setTrialError] = useState<string | null>(null)

  // Поля поддержки
  const [supportName, setSupportName] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [supportSuccess, setSupportSuccess] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTrialError(null)
    if (!trialName || !trialEmail) {
      setTrialError("Пожалуйста, заполните имя и email")
      return
    }

    const { error } = await supabase.from("course_signup_requests").insert({
      name: trialName,
      email: trialEmail,
      phone: trialPhone,
      course: "trial"
    })

    if (error) {
      setTrialError("Ошибка при отправке формы")
    } else {
      setTrialSuccess(true)
      setTrialName("")
      setTrialPhone("")
      setTrialEmail("")
    }
  }

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supportName || !supportEmail) return
    await supabase.from("support_requests").insert({
      name: supportName,
      email: supportEmail,
      message: "Отправлено с главной страницы"
    })
    setSupportSuccess(true)
    setSupportName("")
    setSupportEmail("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero с формой */}
        <section className="bg-[#4F9AB6] py-12 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="bg-white rounded-3xl p-8 shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Запишись на пробный урок</h2>
                {trialSuccess ? (
                  <div className="text-green-600">Спасибо! Заявка отправлена.</div>
                ) : (
                  <form onSubmit={handleTrialSubmit} className="space-y-4">
                    <Image src="/assets/img/freelesson.png" alt="Онлайн урок" width={300} height={200} className="rounded-2xl mx-auto" />
                    <input
                      type="text"
                      placeholder="Имя"
                      className="w-full px-4 py-2 border rounded-md"
                      value={trialName}
                      onChange={(e) => setTrialName(e.target.value)}
                    />
                    <input
                      type="tel"
                      placeholder="+7(__)___-__-__"
                      className="w-full px-4 py-2 border rounded-md"
                      value={trialPhone}
                      onChange={(e) => setTrialPhone(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="email@email.com"
                      className="w-full px-4 py-2 border rounded-md"
                      value={trialEmail}
                      onChange={(e) => setTrialEmail(e.target.value)}
                    />
                    {trialError && <p className="text-red-500 text-sm">{trialError}</p>}
                    <Button className="w-full bg-[#4F9AB6] text-white hover:bg-[#3c7e96]">Записаться</Button>
                  </form>
                )}
              </div>
              {/* Текст справа */}
              <div className="text-white max-w-lg text-center md:text-left">
                <h1 className="text-5xl font-bold mb-8">Всего 10 минут в день — и ты заговоришь на новом языке!</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Поддержка и Telegram */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Остались вопросы */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Остались вопросы?</h2>
              <p className="mb-4">Заполните форму, и мы свяжемся с вами!</p>
              {supportSuccess ? (
                <div className="text-green-600">Спасибо! Мы скоро свяжемся с вами.</div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <Input
                    placeholder="Имя"
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                  <Button className="w-full bg-[#4F9AB6] text-white hover:bg-[#3c7e96]">Отправить</Button>
                </form>
              )}
            </div>

            {/* Telegram */}
            <div className="bg-blue-600 text-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                Поддержка в Telegram
                <Image
                  src="/assets/img/icons/telegram_icon_registr.svg"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="ml-2"
                />
              </h2>
              <p className="mb-6">Мы на связи 24/7. Задавайте любые вопросы.</p>
              <Button
                asChild
                className="bg-white text-blue-600 hover:bg-white/90 w-full"
              >
                <a href="https://t.me/thalindriel" target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
