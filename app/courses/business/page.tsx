"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SignupTrigger } from "@/components/signup-trigger"
import Image from "next/image"
import { X } from "lucide-react"

interface CourseModule {
  title: string
  description: string
  color: string
  detailedInfo: {
    fullDescription: string
    topics: string[]
    duration: string
    skills: string[]
  }
}

export default function BusinessCoursePage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [successTrial, setSuccessTrial] = useState(false)

  const [nameCourse, setNameCourse] = useState("")
  const [phoneCourse, setPhoneCourse] = useState("")
  const [emailCourse, setEmailCourse] = useState("")
  const [agreedCourse, setAgreedCourse] = useState(false)
  const [successCourse, setSuccessCourse] = useState(false)

  const [activeModule, setActiveModule] = useState<CourseModule | null>(null)

  const modules: CourseModule[] = [/* ...оставь модули как есть, их не трогал */]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center min-h-[600px] flex items-center"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gregoryhayes-wiOXHPxShxqGQ1DKU1PXOfuKbLgmzj.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl text-white">
              <div className="flex space-x-2 mb-4">
                <span className="inline-block bg-gray-600/50 text-white text-sm px-3 py-1 rounded-full">Курс</span>
                <span className="inline-block bg-gray-600/50 text-white text-sm px-3 py-1 rounded-full">Для всех уровней</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">Английский для бизнеса</h1>
              <p className="text-xl mb-8 font-light">
                Этот курс разработан для тех, кто хочет уверенно использовать английский язык в деловом общении...
              </p>
            </div>
          </div>
        </section>

        {/* Форма на пробное занятие */}
        <div className="container mx-auto px-6 -mt-20 relative z-20">
          <div className="bg-[#3a5c6a] text-white rounded-lg overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Проведите первый урок модуля бесплатно</h2>
                <p className="mb-6 text-sm">Вы узнаете, чем отличается деловой английский, как представлять себя и формулировать запросы...</p>

                {successTrial ? (
                  <div className="bg-green-500/20 p-4 rounded-md">Спасибо за заявку! Мы свяжемся с вами в ближайшее время.</div>
                ) : (
                  <form className="space-y-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Имя"
                      required
                      className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7(__)___-__-__"
                      required
                      className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@email.com"
                      required
                      className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md"
                    />

                    <SignupTrigger
                      type="trial"
                      course="Деловой английский"
                      slug="business"
                      prefillName={name}
                      prefillEmail={email}
                      prefillPhone={phone}
                      agreed={agreed}
                      onSuccess={() => {
                        setSuccessTrial(true)
                        setName("")
                        setEmail("")
                        setPhone("")
                      }}
                    />

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v as boolean)} />
                      <label htmlFor="terms" className="text-xs text-white/80">Согласие на обработку персональных данных</label>
                    </div>
                  </form>
                )}
              </div>

              <div className="md:w-1/2 relative min-h-[400px]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brucemars-7vUQNhguFtiybMWSlWRt52ObcuW1lN.png"
                  alt="Бизнесмен с ноутбуком"
                  width={500}
                  height={600}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Модули курса и форма записи */}
        <div className="container mx-auto px-6 py-12">
          {/* Модули - оставь без изменений */}


          {/* Запись на курс */}
          <div className="bg-gray-50 rounded-lg p-8 my-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold mb-4">Готовы начать обучение?</h2>
                <p className="text-gray-600 mb-6 font-light">Заполните форму и мы свяжемся с вами!</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Запись на курс</h3>

                {successCourse ? (
                  <div className="bg-green-100 p-4 rounded-md text-green-700">
                    Спасибо за заявку на курс!
                  </div>
                ) : (
                  <form className="space-y-4">
                    <input
                      type="text"
                      value={nameCourse}
                      onChange={(e) => setNameCourse(e.target.value)}
                      placeholder="Имя"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="email"
                      value={emailCourse}
                      onChange={(e) => setEmailCourse(e.target.value)}
                      placeholder="Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="tel"
                      value={phoneCourse}
                      onChange={(e) => setPhoneCourse(e.target.value)}
                      placeholder="Телефон"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />

                    <SignupTrigger
                      type="course"
                      course="Деловой английский"
                      slug="business"
                      prefillName={nameCourse}
                      prefillEmail={emailCourse}
                      prefillPhone={phoneCourse}
                      agreed={agreedCourse}
                      onSuccess={() => {
                        setSuccessCourse(true)
                        setNameCourse("")
                        setEmailCourse("")
                        setPhoneCourse("")
                      }}
                    />

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms-course" checked={agreedCourse} onCheckedChange={(v) => setAgreedCourse(v as boolean)} />
                      <label htmlFor="terms-course" className="text-xs text-gray-600">
                        Согласие на обработку персональных данных
                      </label>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
