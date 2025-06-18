"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SignupTrigger } from "@/components/signup-trigger"

export default function ExamsCoursePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeExam, setActiveExam] = useState<"toefl" | "ielts">("toefl")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center min-h-[600px] flex items-center"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/examinationbg.jpg-ZWuww1AssLOaTqLwaQpPaja8PV66wC.jpeg')`,
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Добавим анимации для страницы "Подготовка к экзаменам" */}

            {/* Добавим анимацию для Hero-секции */}
            <div className="max-w-2xl text-white">
              <div className="flex space-x-2 mb-4 animate-fade-in" style={{ animationDuration: "0.8s" }}>
                <span className="inline-block bg-gray-600/50 text-white text-sm px-3 py-1 rounded-full">Курс</span>
                <span className="inline-block bg-gray-600/50 text-white text-sm px-3 py-1 rounded-full">
                  TOEFL/IELTS
                </span>
              </div>

              <h1
                className="text-4xl font-bold mb-6 animate-slide-up"
                style={{ animationDuration: "1s", animationDelay: "0.2s" }}
              >
                Подготовка к международным экзаменам TOEFL и IELTS
              </h1>

              <p
                className="text-xl mb-8 font-light animate-slide-up"
                style={{ animationDuration: "1s", animationDelay: "0.4s" }}
              >
                Курс подготовки к TOEFL и IELTS — это уникальная программа, специально разработанная для студентов,
                профессионалов и всех желающих улучшить свой уровень английского языка и успешно сдать международные
                экзамены.
              </p>

              <SignupTrigger course="Подготовка к международным экзаменам TOEFL и IELTS" 
                slug="exams"
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          <div className="mb-12">
            <p className="text-lg mb-8">
              Наши курсы подготовки помогут вам достичь желаемых баллов в TOEFL и IELTS. Мы предлагаем комплексную
              программу, охватывающую все аспекты экзаменов.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* TOEFL Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">TOEFL</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Подготовка к компьютерному формату</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Практика всех секций: Reading, Listening, Speaking, Writing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Стратегии выполнения заданий</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Пробные тесты с анализом результатов</span>
                  </li>
                </ul>
              </div>

              {/* IELTS Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">IELTS</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Academic и General Training модули</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Интенсивная практика всех компонентов</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Техники тайм-менеджмента</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Регулярные mock-тесты</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Exam Structure Tabs */}
            <div className="mb-8">
              {/* Добавим анимацию для табов экзаменов */}
              <div className="flex space-x-2 mb-6">
                <Button
                  className={cn(
                    "px-6 py-2 rounded-md transition-all duration-300",
                    activeExam === "toefl"
                      ? "bg-[#4834d4] text-white transform scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300",
                  )}
                  onClick={() => setActiveExam("toefl")}
                >
                  TOEFL
                </Button>
                <Button
                  className={cn(
                    "px-6 py-2 rounded-md transition-all duration-300",
                    activeExam === "ielts"
                      ? "bg-[#4834d4] text-white transform scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300",
                  )}
                  onClick={() => setActiveExam("ielts")}
                >
                  IELTS
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Exam Structure */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Структура экзамена</h3>

                  {activeExam === "toefl" ? (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Reading (54-72 минуты)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Listening (41-57 минут)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Speaking (17 минут)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Writing (50 минут)</span>
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Listening (30 минут)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Reading (60 минут)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Writing (60 минут)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Speaking (11-14 минут)</span>
                      </li>
                    </ul>
                  )}
                </div>

                {/* Our Approach */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Наш подход</h3>

                  {activeExam === "toefl" ? (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Индивидуальный план подготовки</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Регулярные пробные тесты</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Работа над ошибками</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Стратегии выполнения заданий</span>
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Фокус на разговорной части</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Тренировка академического письма</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Расширение словарного запаса</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Практика с носителями языка</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="my-16">
              <h2 className="text-2xl font-bold mb-8">Почему выбирают нас</h2>
              {/* Добавим анимацию для карточек "Почему выбирают нас" */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="bg-[#2a9d8f] text-white rounded-lg p-6 flex flex-col h-full transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="font-bold mb-2">Опытные преподаватели</h3>
                  <p className="text-white/90 mb-4 font-light">
                    Все наши преподаватели имеют международные сертификаты и опыт подготовки более 5 лет
                  </p>
                  <div className="mt-auto flex justify-center transition-transform duration-500 hover:scale-110">
                    <Image
                      src="/assets/img/teacherbooks_3d.png"
                      alt="Опытные преподаватели"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  className="bg-[#457b9d] text-white rounded-lg p-6 flex flex-col h-full transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3 className="font-bold mb-2">Современные методики</h3>
                  <p className="text-white/90 mb-4 font-light">
                    Используем актуальные материалы и эффективные методики подготовки
                  </p>
                  <div className="mt-auto flex justify-center transition-transform duration-500 hover:scale-110">
                    <Image
                      src="/assets/img/growthgraph_3d.png"
                      alt="Современные методики"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  className="bg-[#e76f51] text-white rounded-lg p-6 flex flex-col h-full transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  <h3 className="font-bold mb-2">Гарантия результата</h3>
                  <p className="text-white/90 mb-4 font-light">
                    Мы гарантируем достижение желаемого балла или вернем деньги
                  </p>
                  <div className="mt-auto flex justify-center transition-transform duration-500 hover:scale-110">
                    <Image
                      src="/assets/img/checkmark_3d.png"
                      alt="Гарантия результата"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Стоимость обучения</h2>
              {/* Добавим анимацию для карточек с ценами */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:translate-y-[-10px] animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="p-6">
                    <h3 className="font-bold mb-4">Базовый курс</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">8 недель обучения</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">1 занятие в неделю</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">Доступ к материалам</span>
                      </li>
                    </ul>
                    <div className="text-3xl font-bold mb-4">30 000₽</div>
                    <Button className="w-full bg-primary hover:bg-primary/90">Записаться</Button>
                  </div>
                </div>

                <div
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:translate-y-[-10px] animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="p-6">
                    <h3 className="font-bold mb-4">Стандарт</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">10 недель обучения</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">2 занятия в неделю</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">Доступ к материалам</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">Пробные тесты</span>
                      </li>
                    </ul>
                    <div className="text-3xl font-bold mb-4">45 000₽</div>
                    <Button className="w-full bg-primary hover:bg-primary/90">Записаться</Button>
                  </div>
                </div>

                <div
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:translate-y-[-10px] animate-fade-in"
                  style={{ animationDelay: "0.7s" }}
                >
                  <div className="p-6">
                    <h3 className="font-bold mb-4">Премиум</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">12 недель обучения</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">3 занятия в неделю</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">Доступ к материалам</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">Пробные тесты</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm font-light">Индивидуальный план</span>
                      </li>
                    </ul>
                    <div className="text-3xl font-bold mb-4">70 000₽</div>
                    <Button className="w-full bg-primary hover:bg-primary/90">Записаться</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            {/* Добавим анимацию для CTA-секции */}
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 animate-slide-up" style={{ animationDuration: "1s" }}>
                Готовы начать подготовку к международным экзаменам?
              </h2>
              <p className="text-lg mb-8 animate-slide-up" style={{ animationDuration: "1s", animationDelay: "0.2s" }}>
                Запишитесь на бесплатную консультацию, и мы поможем вам выбрать оптимальную программу обучения
              </p>
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md transition-all duration-500 transform hover:scale-110 active:scale-95 animate-slide-up"
                style={{ animationDuration: "1s", animationDelay: "0.4s" }}
              >
                Записаться на консультацию
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

