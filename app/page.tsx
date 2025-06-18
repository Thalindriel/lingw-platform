"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createBrowserClient } from "@supabase/ssr"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleTrialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = form.name.value
    const phone = form.phone.value
    const email = form.email.value

    const {
      data: { session }
    } = await supabase.auth.getSession()

    await supabase.from("course_signup_requests").insert({
      user_id: session?.user?.id || null,
      course: "trial",
      name,
      phone,
      email
    })

    form.reset()
    alert("Заявка отправлена!")
  }

  const handleSupportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = form.support_name.value
    const email = form.support_email.value

    await supabase.from("support_requests").insert({
      name,
      email,
      message: "Обращение с главной страницы"
    })

    form.reset()
    alert("Обращение отправлено!")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">

        {/* Hero Section */}
        <section className="bg-[#4F9AB6] py-12 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">

              {/* Форма */}
              <div className="bg-white rounded-3xl p-8 shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Запишись на пробный урок</h2>

                <form onSubmit={handleTrialSubmit} className="space-y-4">
                  <input name="name" placeholder="Имя" required className="w-full px-4 py-2 border rounded-md" />
                  <input name="phone" placeholder="+7(__)___-__-__" className="w-full px-4 py-2 border rounded-md" />
                  <input name="email" type="email" placeholder="email@email.com" required className="w-full px-4 py-2 border rounded-md" />
                  <Button type="submit" className="w-full bg-[#4F9AB6] text-white hover:bg-[#3e7e96]">
                    Оставить заявку
                  </Button>
                </form>
              </div>

              {/* Текст */}
              <div className="text-white max-w-lg text-center md:text-left">
                <h1 className="text-5xl font-bold mb-8">Всего 10 минут в день — и ты заговоришь на новом языке!</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Что будет на пробном занятии */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Что будет на пробном занятии</h2>
            <div className="bg-[#6897CC] rounded-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-4">
                  <Image src="/assets/img/mathilde.png" alt="Пробное занятие" width={300} height={400} />
                </div>
                <div className="md:w-2/3 p-8 text-white">
                  <ul className="space-y-4 mb-6 text-xl">
                    <li>• Определим ваш уровень языка</li>
                    <li>• Составим план обучения</li>
                    <li>• Поможем определиться с целью</li>
                  </ul>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    Записаться
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Остались вопросы + Telegram */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Левая форма */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Остались вопросы?</h2>
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <Input name="support_name" placeholder="Имя" required />
                <Input name="support_email" placeholder="Email" type="email" required />
                <Button type="submit" className="w-full">
                  Отправить
                </Button>
              </form>
            </div>

            {/* Telegram блок */}
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                Поддержка в Telegram
                <Image src="/assets/img/icons/telegram_icon_registr.svg" alt="Telegram" width={24} height={24} className="ml-2" />
              </h2>
              <p className="mb-4">Наши специалисты всегда на связи и готовы помочь.</p>
              <a href="https://t.me/thalindriel" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-blue-600 hover:bg-white/90">
                  Написать в Telegram
                </Button>
              </a>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
