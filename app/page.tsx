"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SignupTrigger } from "@/components/signup-trigger"
import { createBrowserClient } from "@supabase/ssr"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
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
    if (!name || !email) return
    await supabase.from("course_signup_requests").insert({
      name,
      email,
      phone,
      course: "trial",
    })
    setName("")
    setEmail("")
    setPhone("")
  }

  const handleSupportSubmit = async () => {
    if (!supportName || !supportEmail) return
    await supabase.from("support_requests").insert({
      name: supportName,
      email: supportEmail,
      message: "Обращение с главной страницы"
    })
    setSupportName("")
    setSupportEmail("")
    setSupportSuccess(true)
    setTimeout(() => setSupportSuccess(false), 3000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* ... (весь код главной страницы остаётся без изменений до формы пробного урока) */}

        <form onSubmit={handleTrialSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md text-gray-400 transition-all duration-300 focus:border-[#4F9AB6] focus:ring-1 focus:ring-[#4F9AB6]"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="+7(__)___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md text-gray-400 transition-all duration-300 focus:border-[#4F9AB6] focus:ring-1 focus:ring-[#4F9AB6]"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md text-gray-400 transition-all duration-300 focus:border-[#4F9AB6] focus:ring-1 focus:ring-[#4F9AB6]"
            />
          </div>
          <Button type="submit" className="w-full bg-[#4F9AB6] hover:bg-[#3d8199] text-white">Записаться</Button>
        </form>

        {/* ... (оставшаяся часть страницы без изменений) */}

        {/* Support Section – Обновлённый */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 drop-shadow-sm">Остались вопросы или нужна помощь?</h2>
                <p className="text-gray-700 mb-6">
                  Заполните форму, и наши специалисты свяжутся с вами.
                </p>
                <div className="space-y-4">
                  <Input
                    placeholder="Имя"
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    value={supportEmail}
                    type="email"
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={handleSupportSubmit}
                    disabled={!supportName || !supportEmail}
                  >
                    {supportSuccess ? "Отправлено!" : "Отправить"}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 drop-shadow-md flex items-center">
                  Поддержка в Telegram 24/7
                  <Image src="/assets/img/icons/telegram_icon_registr.svg" alt="Telegram" width={24} height={24} className="ml-2" />
                </h2>
                <p className="mb-6">Наши специалисты всегда на связи</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">• Ответим на вопросы об обучении</li>
                  <li className="flex items-center">• Поможем с техническими проблемами</li>
                  <li className="flex items-center">• Решим вопросы с оплатой</li>
                  <li className="flex items-center">• Подберем подходящую программу</li>
                </ul>
                <Link href="https://t.me/thalindriel" target="_blank">
                  <Button className="bg-white text-blue-600 hover:bg-white/90 w-full">
                    Написать в Telegram
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
