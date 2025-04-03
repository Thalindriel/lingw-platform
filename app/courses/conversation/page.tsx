"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { CheckIcon } from "lucide-react"

export default function ConversationCoursePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Обработчик отправки формы
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

  // Данные о преподавателях
  const teachers = [
    {
      name: "Евгения",
      experience: "Стаж 11 лет",
      image: "/assets/img/teachers/teacher1.jpg",
    },
    {
      name: "Екатерина",
      experience: "Стаж 6 лет",
      image: "/assets/img/teachers/teacher2.jpg",
    },
    {
      name: "Анатолий",
      experience: "Стаж 10 лет",
      image: "/assets/img/teachers/teacher3.jpg",
    },
    {
      name: "Виктория",
      experience: "Стаж 4 года",
      image: "/assets/img/teachers/teacher4.jpg",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center min-h-[600px] flex items-center"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mujeres.jpg-8Wm85uCo5FtCvjEfAdu7P1l9cOFeGC.jpeg')`,
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div
                className={`text-white transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex space-x-2 mb-4">
                  <span className="inline-block bg-gray-600/50 text-white text-sm px-3 py-1 rounded-full">Курс</span>
                  <span className="inline-block bg-gray-600/50 text-white text-sm px-3 py-1 rounded-full">
                    Для всех уровней
                  </span>
                </div>

                <h1 className="text-4xl font-bold mb-4">Английский для общения</h1>
              </div>

              <div
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: "200ms" }}
              >
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
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          {/* Course Description */}
          <div className="mb-16">
            <p className="text-lg max-w-3xl">
              Курс разговорного английского предназначен для всех, кто хочет улучшить свои навыки общения на английском
              языке и уверенно использовать его в повседневной жизни.
            </p>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-8">
              <div className="flex-none">
                <svg width="131" height="79" viewBox="0 0 131 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 2C28.6963 46.1744 94.2901 57.2179 124 57.2179M124 57.2179C104.874 37.1897 93.5938 32.1827 90.3443 32.1827M124 57.2179L90.3443 75"
                    stroke="#4F9AB6"
                    strokeWidth="8"
                  />
                </svg>
              </div>
              <div className="flex-1 max-w-2xl">
                <p className="text-gray-600">
                  Независимо от вашего уровня подготовки, мы поможем вам развить разговорные навыки, расширить словарный
                  запас и преодолеть языковой барьер.
                </p>
              </div>
            </div>
          </div>

          {/* Teachers Section */}
          <div className="my-16">
            <h2 className="text-2xl font-bold mb-12 max-w-3xl">
              Мы подберем преподавателя, который соответствует вашим целям и интересам. У вас обязательно найдется
              множество тем для обсуждения!
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {teachers.map((teacher, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full overflow-hidden mb-4 relative">
                    <Image src={teacher.image || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-bold text-center text-lg">{teacher.name}</h3>
                  <p className="text-sm text-gray-600 text-center">{teacher.experience}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="my-20">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div>
                  <h2 className="text-2xl font-bold mb-8">На уроках разговорного английского вы научитесь:</h2>
                </div>

                <div className="space-y-8 relative">
                  {/* Верхний вектор */}
                  <div className="absolute -top-16 -left-4 right-0 w-full">
                    <svg
                      width="600"
                      height="200"
                      viewBox="0 0 600 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full"
                    >
                      <path d="M2 180 C150 20 450 20 598 180" stroke="#4F9AB6" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4F9AB6] text-white flex items-center justify-center mr-3">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <p>
                      свободно общаться на различные темы, включая хобби, путешествия и повседневные ситуации, что
                      поможет вам чувствовать себя комфортно в разговоре.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4F9AB6] text-white flex items-center justify-center mr-3">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <p>
                      поможет вам находить подходящие слова для описания своих чувств и мнений, что сделает ваше общение
                      более глубоким и понятным.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4F9AB6] text-white flex items-center justify-center mr-3">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <p>
                      освоите яркие и живые выражения, которые сделают вашу речь более естественной и интересной, что
                      позволит вам лучше взаимодействовать с носителями языка.
                    </p>
                  </div>

                  {/* Нижний вектор */}
                  <div className="absolute -bottom-16 -left-4 right-0 w-full">
                    <svg
                      width="600"
                      height="200"
                      viewBox="0 0 600 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full"
                    >
                      <path d="M2 20 C150 180 450 180 598 20" stroke="#4F9AB6" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Up Section */}
          <div className="bg-gray-50 rounded-lg p-8 my-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold mb-4">Готовы начать обучение?</h2>
                <p className="text-gray-600 mb-6 font-light">Заполните форму и мы свяжемся с вами в ближайшее время!</p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 font-medium">
                      1
                    </div>
                    <p className="font-medium">Оставьте заявку на сайте</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 font-medium">
                      2
                    </div>
                    <p className="font-medium">Мы свяжемся с вами для уточнения деталей</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 font-medium">
                      3
                    </div>
                    <p className="font-medium">Начните обучение в удобное для вас время</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Запись на курс</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Имя"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Телефон"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms2" />
                    <label htmlFor="terms2" className="text-xs text-gray-600">
                      Согласие на обработку персональных данных
                    </label>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">Оставить заявку</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

