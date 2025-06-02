"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { CourseSignupForm } from "@/components/course-signup-form"

interface CourseModuleProps {
  title: string
  lessonsCount: number
  weeksCount: number
  moduleNumber: number
  lessons: string[]
  isOpen: boolean
  onToggle: () => void
}

function CourseModule({ title, lessonsCount, weeksCount, moduleNumber, lessons, isOpen, onToggle }: CourseModuleProps) {
  return (
    <div className="border border-[#E5E7EB] rounded-lg mb-4 overflow-hidden">
      <div className="p-4 flex justify-between items-center cursor-pointer" onClick={onToggle}>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex text-sm text-gray-500 space-x-4">
            <span>{lessonsCount} уроков</span>
            <span>
              {weeksCount} {weeksCount === 1 ? "неделя" : "недели"}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-gray-500 mr-2">Модуль {moduleNumber}</div>
          {isOpen ? <ChevronDown className="text-gray-500" /> : <ChevronRight className="text-gray-500" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 bg-gray-50 border-t">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lessons.map((lesson, index) => (
              <li key={index} className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2 font-medium">
                  {index + 1}
                </div>
                <span className="font-light">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

interface StatCardProps {
  value: string
  label: string
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="text-4xl font-bold text-[#4F9AB6] mb-2">{value}</div>
      <div className="text-gray-700">{label}</div>
    </div>
  )
}

export default function BeginnerCoursePage() {
  const [openModule, setOpenModule] = useState<number | null>(null)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [showCourseDetails, setShowCourseDetails] = useState(false)

  // Добавим состояние для отслеживания загрузки страницы
  const [isLoaded, setIsLoaded] = useState(false)

  // Добавим useEffect для установки состояния загрузки
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const toggleModule = (moduleIndex: number) => {
    if (openModule === moduleIndex) {
      setOpenModule(null)
    } else {
      setOpenModule(moduleIndex)
    }
  }

  // Данные о модулях курса
  const modules = [
    {
      title: "Основы произношения",
      lessonsCount: 12,
      weeksCount: 2,
      lessons: [
        "Алфавит",
        "Гласные звуки",
        "Согласные звуки",
        "Дифтонги",
        "Ударение в словах",
        "Интонация в предложениях",
        "Связывание звуков",
        "Редукция звуков",
        "Произношение окончаний",
        "Ритм речи",
        "Практика чтения",
        "Практика произношения",
      ],
    },
    {
      title: "Базовая грамматика",
      lessonsCount: 15,
      weeksCount: 3,
      lessons: [
        "Личные местоимения",
        "Глагол to be",
        "Артикли",
        "Множественное число существительных",
        "Притяжательные местоимения",
        "Указательные местоимения",
        "Настоящее простое время",
        "Наречия частоты",
        "Предлоги места",
        "Предлоги времени",
        "Модальный глагол can",
        "Повелительное наклонение",
        "Вопросительные слова",
        "Общие вопросы",
        "Специальные вопросы",
      ],
    },
    {
      title: "Простые диалоги",
      lessonsCount: 10,
      weeksCount: 2,
      lessons: [
        "Знакомство",
        "В кафе",
        "В магазине",
        "На улице",
        "В отеле",
        "В аэропорту",
        "В транспорте",
        "Разговор по телефону",
        "Запрос информации",
        "Выражение мнения",
      ],
    },
    {
      title: "Повседневная лексика",
      lessonsCount: 15,
      weeksCount: 3,
      lessons: [
        "Рассказ о себе",
        "Описание внешности",
        "Описание характера",
        "Хобби и интересы",
        "Еда и напитки",
        "Одежда и мода",
        "Дом и квартира",
        "Город и транспорт",
        "Погода и времена года",
        "Путешествия",
        "Здоровье",
        "Работа и профессии",
        "Покупки",
        "Праздники и традиции",
        "Планы на будущее",
      ],
    },
  ]

  // Подробная информация о курсе для модального окна
  const courseDetails = {
    title: "Английский с нуля",
    description: `Курс "Английский с нуля" разработан специально для тех, кто никогда не изучал английский язык или имеет минимальные знания. Наша методика основана на коммуникативном подходе, который позволяет быстро начать говорить на английском языке.`,
    features: [
      "Индивидуальный подход к каждому студенту",
      "Интерактивные уроки с опытными преподавателями",
      "Современные учебные материалы и методики",
      "Регулярная практика разговорной речи",
      "Домашние задания с обратной связью от преподавателя",
      "Доступ к онлайн-платформе с дополнительными материалами",
      "Гибкий график занятий",
      "Сертификат по окончании курса",
    ],
    targetAudience: [
      "Абсолютные новички в изучении английского языка",
      "Люди, которые изучали английский давно и хотят начать заново",
      "Те, кто хочет структурировать свои базовые знания",
      "Студенты, готовящиеся к поступлению в вузы",
      "Специалисты, которым необходим английский для работы",
    ],
    results: [
      "Освоите базовую грамматику английского языка",
      "Сможете поддерживать простые разговоры на английском",
      "Научитесь читать и понимать несложные тексты",
      "Сформируете словарный запас из 1000+ слов",
      "Преодолеете языковой барьер и страх говорения",
    ],
    price: "11000₽ в месяц",
    duration: "3 месяца (12 недель)",
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center py-16"
          style={{
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/online.jpg-Pkdnkx6Ld8k8tJu7Vt6923z7ywbYnV.jpeg')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl text-white">
              <div
                className={`flex space-x-2 mb-4 transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <span className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">Курс</span>
                <span className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
                  Для начинающих
                </span>
              </div>

              <h1
                className={`text-4xl font-bold mb-4 transition-all duration-500 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                Английский с нуля
              </h1>

              <p
                className={`text-xl mb-8 transition-all duration-500 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                Начните говорить на английском уже через 3 месяца с нашим комплексным курсом для начинающих
              </p>

              <div
                className={`flex flex-wrap gap-4 transition-all duration-500 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <Button
                  className="bg-[#4F9AB6] hover:bg-[#4F9AB6]/90 font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
                  onClick={() => setShowSignupForm(true)}
                >
                  Начать обучение
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10 font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
                  onClick={() => setShowCourseDetails(true)}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 mb-16 relative z-20">
            <div
              className={`transition-all duration-500 delay-100 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <StatCard value="50+" label="Практических заданий" />
            </div>
            <div
              className={`transition-all duration-500 delay-200 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <StatCard value="12" label="Недель обучения" />
            </div>
            <div
              className={`transition-all duration-500 delay-300 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <StatCard value="24/7" label="Поддержка студентов" />
            </div>
          </div>

          {/* Course Program Section */}
          <div className="my-16">
            <h2
              className={`text-2xl font-bold mb-8 transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Программа курса
            </h2>

            <div className="space-y-4">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <CourseModule
                    title={module.title}
                    lessonsCount={module.lessonsCount}
                    weeksCount={module.weeksCount}
                    moduleNumber={index + 1}
                    lessons={module.lessons}
                    isOpen={openModule === index}
                    onToggle={() => toggleModule(index)}
                  />
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
                <CourseSignupForm courseId="beginner" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно для формы записи */}
      {showSignupForm && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          style={{ opacity: showSignupForm ? 1 : 0 }}
          onClick={() => setShowSignupForm(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto transition-all duration-500 transform"
            style={{
              opacity: showSignupForm ? 1 : 0,
              transform: showSignupForm ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              onClick={() => setShowSignupForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-4 animate-slide-up delay-100">Запись на курс</h2>
              <p className="text-gray-600 mb-6 animate-slide-up delay-200">
                Заполните форму, и мы свяжемся с вами для уточнения деталей
              </p>
              <div className="animate-slide-up delay-300">
                <CourseSignupForm courseId="beginner" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для информации о курсе */}
      {showCourseDetails && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          style={{ opacity: showCourseDetails ? 1 : 0 }}
          onClick={() => setShowCourseDetails(false)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto transition-all duration-500 transform"
            style={{
              opacity: showCourseDetails ? 1 : 0,
              transform: showCourseDetails ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              onClick={() => setShowCourseDetails(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 animate-slide-up delay-100">{courseDetails.title}</h2>

              <div className="space-y-6">
                <p className="text-gray-700 animate-slide-up delay-200">{courseDetails.description}</p>

                <div className="animate-slide-up delay-300">
                  <h3 className="text-lg font-bold mb-2">Особенности курса</h3>
                  <ul className="space-y-1">
                    {courseDetails.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start animate-slide-in-right"
                        style={{ animationDelay: `${300 + index * 50}ms` }}
                      >
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="animate-slide-up delay-400">
                  <h3 className="text-lg font-bold mb-2">Для кого этот курс</h3>
                  <ul className="space-y-1">
                    {courseDetails.targetAudience.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start animate-slide-in-right"
                        style={{ animationDelay: `${400 + index * 50}ms` }}
                      >
                        <span className="text-primary mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="animate-slide-up delay-500">
                  <h3 className="text-lg font-bold mb-2">Результаты обучения</h3>
                  <ul className="space-y-1">
                    {courseDetails.results.map((result, index) => (
                      <li
                        key={index}
                        className="flex items-start animate-slide-in-right"
                        style={{ animationDelay: `${500 + index * 50}ms` }}
                      >
                        <span className="text-primary mr-2">•</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg animate-slide-up delay-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Стоимость</h3>
                      <p className="text-lg text-primary font-bold">{courseDetails.price}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Продолжительность</h3>
                      <p>{courseDetails.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end animate-slide-up delay-700">
                  <Button
                    className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={() => {
                      setShowCourseDetails(false)
                      setTimeout(() => setShowSignupForm(true), 300)
                    }}
                  >
                    Записаться на курс
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

