"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { X } from "lucide-react"
import { SignupTrigger } from "@/components/signup-trigger"

// Интерфейс для модуля курса
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
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Состояние для модального окна
  const [activeModule, setActiveModule] = useState<CourseModule | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !phone || !email || !agreed) {
      return
    }

    setIsSubmitting(true)

    // Имитация отправки данных
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)
    setName("")
    setPhone("")
    setEmail("")
  }

  // Данные о модулях курса с подробной информацией
  const modules: CourseModule[] = [
    {
      title: "Основы делового английского",
      description: "Деловой этикет, формальная и неформальная лексика, структура делового письма, базовые коммуникации",
      color: "#6d2e46",
      detailedInfo: {
        fullDescription:
            "Этот модуль закладывает фундамент для успешного делового общения на английском языке. Вы изучите основные принципы делового этикета, научитесь различать формальную и неформальную лексику, а также освоите структуру и правила составления деловых писем. Модуль включает практические упражнения, которые помогут вам применить полученные знания в реальных ситуациях.",
        topics: [
          "Деловой этикет в международной среде",
          "Формальная и неформальная лексика",
          "Структура и форматирование деловых писем",
          "Электронная переписка и нетикет",
          "Представление себя и компании",
          "Базовые коммуникативные навыки",
          "Телефонные разговоры в деловой среде",
          "Назначение и подтверждение встреч",
        ],
        duration: "4 недели (8 занятий)",
        skills: [
          "Составление деловых писем",
          "Ведение деловой переписки",
          "Телефонные переговоры",
          "Представление себя и компании",
        ],
      },
    },
    {
      title: "Вербальное деловое общение",
      description:
          "Ведение переговоров, участие в совещаниях, деловые звонки и видеоконференции, работа с клиентами и партнерами",
      color: "#2a6d5d",
      detailedInfo: {
        fullDescription:
            "Модуль посвящен развитию навыков устного делового общения. Вы научитесь эффективно участвовать в деловых встречах, проводить презентации, вести переговоры и поддерживать профессиональную коммуникацию с клиентами и партнерами. Особое внимание уделяется практике речи и отработке типичных ситуаций делового общения.",
        topics: [
          "Стратегии ведения переговоров",
          "Участие и проведение совещаний",
          "Деловые звонки и видеоконференции",
          "Презентация продуктов и услуг",
          "Работа с клиентами и партнерами",
          "Выражение мнения и аргументация",
          "Активное слушание и обратная связь",
          "Разрешение конфликтных ситуаций",
        ],
        duration: "5 недель (10 занятий)",
        skills: [
          "Ведение переговоров",
          "Проведение презентаций",
          "Участие в совещаниях",
          "Работа с возражениями",
          "Деловые звонки и видеоконференции",
        ],
      },
    },
    {
      title: "Переговоры и деловой этикет",
      description:
          "Стратегии ведения переговоров, аргументация, работа с возражениями, культурные особенности делового общения в разных странах",
      color: "#4d6d2e",
      detailedInfo: {
        fullDescription:
            "Этот модуль углубляет навыки ведения переговоров и знакомит с культурными особенностями делового общения в разных странах. Вы изучите различные стратегии ведения переговоров, научитесь эффективно аргументировать свою позицию и работать с возражениями. Особое внимание уделяется межкультурной коммуникации и адаптации стиля общения к различным деловым культурам.",
        topics: [
          "Продвинутые стратегии ведения переговоров",
          "Техники аргументации и убеждения",
          "Работа с возражениями и сложными ситуациями",
          "Культурные особенности делового общения",
          "Деловой этикет в США, Великобритании, Европе и Азии",
          "Невербальная коммуникация в разных культурах",
          "Адаптация коммуникативного стиля",
          "Международные деловые мероприятия и протокол",
        ],
        duration: "6 недель (12 занятий)",
        skills: [
          "Межкультурная коммуникация",
          "Стратегическое ведение переговоров",
          "Убедительная аргументация",
          "Адаптация к различным деловым культурам",
          "Соблюдение международного делового протокола",
        ],
      },
    },
    {
      title: "Английский для профессиональной среды",
      description:
          "Специализированная лексика для различных отраслей, подготовка и проведение презентаций, участие в конференциях и деловых мероприятиях",
      color: "#8d5d2e",
      detailedInfo: {
        fullDescription:
            "Заключительный модуль курса фокусируется на специализированной лексике и коммуникативных навыках, необходимых в конкретных профессиональных областях. Вы освоите терминологию вашей отрасли, научитесь готовить и проводить профессиональные презентации, а также эффективно участвовать в конференциях и деловых мероприятиях международного уровня.",
        topics: [
          "Специализированная лексика по отраслям (финансы, IT, маркетинг, HR и др.)",
          "Подготовка и проведение профессиональных презентаций",
          "Участие в конференциях и деловых мероприятиях",
          "Нетворкинг и установление деловых контактов",
          "Составление профессионального резюме и сопроводительного письма",
          "Прохождение собеседования на английском языке",
          "Ведение проектной документации",
          "Профессиональное развитие и карьерный рост",
        ],
        duration: "5 недель (10 занятий)",
        skills: [
          "Использование профессиональной терминологии",
          "Проведение презентаций высокого уровня",
          "Участие в международных конференциях",
          "Нетворкинг на английском языке",
          "Составление профессиональной документации",
        ],
      },
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
                backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gregoryhayes-wiOXHPxShxqGQ1DKU1PXOfuKbLgmzj.png')`,
                backgroundPosition: "center",
              }}
          >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-2xl text-white">
                <div className="flex space-x-2 mb-4">
                  <span className="inline-block bg-gray-600/50 text-white text-sm px-3 py-1 rounded-full">Курс</span>
                  <span className="inline-block bg-gray-600/50 text-white text-sm px-3 py-1 rounded-full">
                  Для всех уровней
                </span>
                </div>

                <h1 className="text-5xl font-bold mb-6 animate-fade-in" style={{ animationDuration: "1s" }}>
                  Английский для бизнеса
                </h1>

                <p
                    className="text-xl mb-8 font-light animate-slide-up"
                    style={{ animationDuration: "1s", animationDelay: "0.3s" }}
                >
                  Этот курс разработан для тех, кто хочет уверенно использовать английский язык в деловом общении. Вы
                  научитесь вести переговоры, составлять профессиональную деловую переписку, участвовать в встречах и
                  презентациях, а также общаться с коллегами и партнёрами на международном уровне.
                </p>
              </div>
            </div>
          </section>

          {/* Free Lesson Form Section */}
          <div className="container mx-auto px-6 -mt-20 relative z-20">
            <div className="bg-[#3a5c6a] text-white rounded-lg overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 animate-fade-in" style={{ animationDuration: "1s", animationDelay: "0.5s" }}>
                  <h2 className="text-2xl font-bold mb-4">Проведите первый урок модуля бесплатно</h2>

                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Вы узнаете:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>чем деловой английский отличается от общего,</li>
                      <li>как представлять себя в профессиональной среде,</li>
                      <li>как формулировать деловые письма, запросы и т.д.</li>
                    </ul>
                  </div>

                  {isSuccess ? (
                      <div className="bg-green-500/20 p-4 rounded-md">
                        Спасибо за заявку! Мы свяжемся с вами в ближайшее время.
                      </div>
                  ) : (
                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                          <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Имя"
                              required
                              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
                          />
                        </div>

                        <div>
                          <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+7(__)___-__-__"
                              required
                              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
                          />
                        </div>

                        <div>
                          <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="email@email.com"
                              required
                              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
                          />
                        </div>

                        <SignupTrigger
                            course="Пробный урок"
                            slug="trial"
                            prefillName={name}
                            prefillEmail={email}
                            prefillPhone={phone}
                        />

                        <div className="flex items-center space-x-2">
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

                <div className="md:w-1/2 relative min-h-[400px]">
                  <div className="absolute inset-0 flex items-end justify-end">
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
          </div>

          <div className="container mx-auto px-6 py-12">
            {/* Course Modules */}
            <div className="my-16">
              <h2 className="text-2xl font-bold mb-8">Программа английского для бизнеса</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((module, index) => (
                    <div
                        key={index}
                        className="rounded-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-lg animate-fade-in"
                        style={{ backgroundColor: module.color, animationDelay: `${0.2 * (index + 1)}s` }}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                      <p className="text-white/90 mb-4 font-light">{module.description}</p>
                      <Button
                          variant="outline"
                          className="bg-white text-gray-800 hover:bg-white/90 font-medium transition-all duration-300 hover:translate-y-[-5px]"
                          onClick={() => setActiveModule(module)}
                      >
                        Узнать подробнее
                      </Button>
                    </div>
                ))}
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
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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

                    <SignupTrigger
                        course="Деловой английский"
                        slug="business"
                        prefillName={name}
                        prefillEmail={email}
                        prefillPhone={phone}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Модальное окно с подробной информацией о модуле */}
        {activeModule && (
            <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
                style={{ opacity: activeModule ? 1 : 0 }}
                onClick={() => setActiveModule(null)}
            >
              <div
                  className="bg-white rounded-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto transition-all duration-500 transform"
                  style={{
                    opacity: activeModule ? 1 : 0,
                    transform: activeModule ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  onClick={(e) => e.stopPropagation()}
              >
                <button
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    onClick={() => setActiveModule(null)}
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="animate-fade-in">
                  <div className="h-2 w-full rounded-full mb-6" style={{ backgroundColor: activeModule.color }}></div>

                  <h2 className="text-2xl font-bold mb-4 animate-slide-up delay-100">{activeModule.title}</h2>

                  <div className="space-y-6">
                    <p className="text-gray-700 animate-slide-up delay-200">{activeModule.detailedInfo.fullDescription}</p>

                    <div className="animate-slide-up delay-300">
                      <h3 className="text-lg font-bold mb-2">Темы модуля</h3>
                      <ul className="space-y-1">
                        {activeModule.detailedInfo.topics.map((topic, index) => (
                            <li
                                key={index}
                                className="flex items-start animate-slide-in-right"
                                style={{ animationDelay: `${300 + index * 50}ms` }}
                            >
                              <span className="text-primary mr-2">•</span>
                              <span>{topic}</span>
                            </li>
                        ))}
                      </ul>
                    </div>

                    <div className="animate-slide-up delay-400">
                      <h3 className="text-lg font-bold mb-2">Навыки, которые вы приобретете</h3>
                      <ul className="space-y-1">
                        {activeModule.detailedInfo.skills.map((skill, index) => (
                            <li
                                key={index}
                                className="flex items-start animate-slide-in-right"
                                style={{ animationDelay: `${400 + index * 50}ms` }}
                            >
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{skill}</span>
                            </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg animate-slide-up delay-500">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">Продолжительность</h3>
                          <p>{activeModule.detailedInfo.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end animate-slide-up delay-600">
                      <Button
                          className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
                          onClick={() => setActiveModule(null)}
                      >
                        Закрыть
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}

        <Footer />
      </div>
  )
}
