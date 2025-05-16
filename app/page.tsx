"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#4F9AB6] py-12 relative overflow-hidden">
          <div
            className={`container mx-auto px-6 transition-opacity duration-1000 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {/* Trial Lesson Form */}
              <div className="bg-white rounded-3xl p-8 shadow-md max-w-md w-full mb-8 md:mb-0 z-10 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold mb-6 text-center">Запишись на пробный урок</h2>

                <div className="mb-6">
                  <Image
                    src="/assets/img/freelesson.png"
                    alt="Онлайн урок"
                    width={300}
                    height={200}
                    className="rounded-2xl mx-auto"
                  />
                </div>

                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Имя"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md text-gray-400 transition-all duration-300 focus:border-[#4F9AB6] focus:ring-1 focus:ring-[#4F9AB6]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="+7(__)___-__-__"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md text-gray-400 transition-all duration-300 focus:border-[#4F9AB6] focus:ring-1 focus:ring-[#4F9AB6]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="email@email.com"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md text-gray-400 transition-all duration-300 focus:border-[#4F9AB6] focus:ring-1 focus:ring-[#4F9AB6]"
                    />
                  </div>
                  <SignupTrigger course="Пробное занятие"/>
                </form>
              </div>

              {/* Hero Content */}
              <div
                className="text-white max-w-lg z-10 text-center md:text-left transition-all duration-700 delay-300"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <h1 className="text-5xl font-bold leading-tight mb-8">
                  Всего 10 минут в день — и ты заговоришь на новом языке!
                </h1>

                <div className="space-y-4">
                  <div className="flex items-center md:justify-start justify-center">
                    <span className="text-yellow-300 mr-2 text-xl animate-pulse">•</span>
                    <span className="font-light text-xl">Гибкий график</span>
                  </div>
                  <div className="flex items-center md:justify-start justify-center">
                    <span className="text-yellow-300 mr-2 text-xl animate-pulse" style={{ animationDelay: "0.5s" }}>
                      •
                    </span>
                    <span className="font-light text-xl">Эффективные методы</span>
                  </div>
                  <div className="flex items-center md:justify-start justify-center">
                    <span className="text-yellow-300 mr-2 text-xl animate-pulse" style={{ animationDelay: "1s" }}>
                      •
                    </span>
                    <span className="font-light text-xl">Индивидуальный подход</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Learn Section */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <h2
              className="text-3xl font-bold text-center mb-12 transition-all duration-700"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              Почему стоит изучать языки на LingW
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div
                className="bg-[#4F9AB6] rounded-xl p-6 text-white relative overflow-hidden transition-all duration-500 hover:shadow-lg transform hover:-translate-y-2"
                style={{
                  minHeight: "320px",
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "200ms",
                }}
              >
                <h3 className="text-2xl font-bold mb-3">Гибкий график</h3>
                <p className="text-white/90 mb-4 text-lg">
                  У нас вы можете учиться в удобное для вас время. Мы предлагаем онлайн-уроки, которые легко вписываются
                  в ваш график.
                </p>
                <div className="absolute right-0 bottom-0 transition-transform duration-500 transform hover:scale-105 md:block hidden">
                  <Image
                    src="/assets/img/laura.png"
                    alt="Студент с гибким графиком"
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Feature 2 */}
              <div
                className="bg-[#4F9AB6] rounded-xl p-6 text-white relative overflow-hidden transition-all duration-500 hover:shadow-lg transform hover:-translate-y-2"
                style={{
                  minHeight: "320px",
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "400ms",
                }}
              >
                <h3 className="text-2xl font-bold mb-3">Эффективные методы</h3>
                <p className="text-white/90 mb-4 text-lg">
                  Мы используем современные методики обучения, чтобы процесс изучения был интересным и увлекательным.
                </p>
                <div className="absolute right-0 bottom-0 transition-transform duration-500 transform hover:scale-105 md:block hidden">
                  <Image
                    src="/assets/img/edpyly.png"
                    alt="Эффективные методы обучения"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Feature 3 */}
              <div
                className="bg-[#4F9AB6] rounded-xl p-6 text-white relative overflow-hidden transition-all duration-500 hover:shadow-lg transform hover:-translate-y-2"
                style={{
                  minHeight: "320px",
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "600ms",
                }}
              >
                <h3 className="text-2xl font-bold mb-3">Индивидуальный подход</h3>
                <p className="text-white/90 mb-4 text-lg">
                  Мы понимаем, что каждый ученик уникален. Наши курсы адаптированы под ваши цели и уровень подготовки.
                </p>
                <div className="absolute right-0 bottom-0 transition-transform duration-500 transform hover:scale-105 md:block hidden">
                  <Image
                    src="/assets/img/vitaly.png"
                    alt="Индивидуальный подход"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Lesson Content Section */}
        <div className="py-12">
          <div className="container mx-auto px-6">
            <h2
              className="text-3xl font-bold mb-8 transition-all duration-700"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              Что будет на пробном занятии
            </h2>

            <div
              className="bg-[#6897CC] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <div className="absolute bottom-0 left-0 right-0 transition-transform duration-500 transform hover:scale-105">
                    <Image
                      src="/assets/img/mathilde.png"
                      alt="Пробное занятие"
                      width={300}
                      height={400}
                      className="object-contain mx-auto"
                    />
                  </div>
                </div>

                <div className="md:w-2/3 p-8 text-white">
                  <div className="space-y-6 mb-8">
                    <p
                      className="flex items-start text-2xl transition-all duration-500"
                      style={{
                        transitionDelay: "200ms",
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? "translateX(0)" : "translateX(20px)",
                      }}
                    >
                      <span className="mr-2">•</span>
                      <span>Определим ваш уровень языка</span>
                    </p>
                    <p
                      className="flex items-start text-2xl transition-all duration-500"
                      style={{
                        transitionDelay: "400ms",
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? "translateX(0)" : "translateX(20px)",
                      }}
                    >
                      <span className="mr-2">•</span>
                      <span>Составим вам план обучения</span>
                    </p>
                    <p
                      className="flex items-start text-2xl transition-all duration-500"
                      style={{
                        transitionDelay: "600ms",
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? "translateX(0)" : "translateX(20px)",
                      }}
                    >
                      <span className="mr-2">•</span>
                      <span>Поможем определиться с целью обучения</span>
                    </p>
                  </div>

                  <button className="bg-white text-[#6897CC] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98]">
                    Записаться на пробное занятие
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2
              className="text-2xl font-bold mb-4 drop-shadow-md transition-all duration-700"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              Курсы английского языка для любых целей
            </h2>
            <p
              className="text-gray-700 mb-10 transition-all duration-700"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "200ms",
              }}
            >
              Выберите подходящий курс исходя из ваших целей и текущего уровня знания языка
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="bg-gradient-to-r from-[#B04540] to-[#8E322E] rounded-lg p-6 flex flex-col h-full group hover:shadow-md transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "300ms",
                }}
              >
                <h3 className="text-lg font-bold mb-2 drop-shadow-sm text-white">Английский с нуля</h3>
                <p className="text-white/90 text-sm mb-4 flex-1">
                  Фундамент языка для тех, кто только начал изучать английский язык. Идеально подходит для новичков.
                </p>
                <div className="mt-auto">
                  <p className="font-bold mb-2 text-white">11000₽ в месяц</p>
                  <Link href="/courses/beginner">
                    <Button
                      variant="outline"
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#B04540] hover:bg-white/90 border-white"
                    >
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </div>

              <div
                className="bg-gradient-to-r from-[#C98442] to-[#A56A34] rounded-lg p-6 flex flex-col h-full group hover:shadow-md transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "400ms",
                }}
              >
                <h3 className="text-lg font-bold mb-2 drop-shadow-sm text-white">Разговорный английский</h3>
                <p className="text-white/90 text-sm mb-4 flex-1">
                  Фокус на практическом использовании языка в повседневных ситуациях. Развитие разговорных навыков.
                </p>
                <div className="mt-auto">
                  <p className="font-bold mb-2 text-white">12500₽ в месяц</p>
                  <Link href="/courses/conversation">
                    <Button
                      variant="outline"
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#C98442] hover:bg-white/90 border-white"
                    >
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </div>

              <div
                className="bg-gradient-to-r from-[#4E87A0] to-[#3B6C83] rounded-lg p-6 flex flex-col h-full group hover:shadow-md transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "500ms",
                }}
              >
                <h3 className="text-lg font-bold mb-2 drop-shadow-sm text-white">Деловой английский</h3>
                <p className="text-white/90 text-sm mb-4 flex-1">
                  Курс, ориентированный на изучение английского языка в профессиональной среде, бизнес-лексика и этикет.
                </p>
                <div className="mt-auto">
                  <p className="font-bold mb-2 text-white">14000₽ в месяц</p>
                  <Link href="/courses/business">
                    <Button
                      variant="outline"
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#4E87A0] hover:bg-white/90 border-white"
                    >
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </div>

              <div
                className="bg-gradient-to-r from-[#6E5A8C] to-[#564471] rounded-lg p-6 flex flex-col h-full group hover:shadow-md transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "600ms",
                }}
              >
                <h3 className="text-lg font-bold mb-2 drop-shadow-sm text-white">Подготовка к TOEFL/IELTS</h3>
                <p className="text-white/90 text-sm mb-4 flex-1">
                  Специальный курс для подготовки к международным экзаменам. Стратегии и практика тестов.
                </p>
                <div className="mt-auto">
                  <p className="font-bold mb-2 text-white">от 30000₽ в месяц</p>
                  <Link href="/courses/exams">
                    <Button
                      variant="outline"
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#6E5A8C] hover:bg-white/90 border-white"
                    >
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className="bg-white rounded-lg p-6 shadow-sm transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "300ms",
                }}
              >
                <h2 className="text-xl font-bold mb-4 drop-shadow-sm">Остались вопросы или нужна помощь?</h2>
                <p className="text-gray-700 mb-6">
                  Заполните форму, и наши специалисты свяжутся с вами. Расскажем подробнее об обучении, ответим на
                  вопросы и поможем определиться с курсом.
                </p>
                <div className="space-y-4">
                  <Input
                    placeholder="Имя"
                    className="text-gray-800 transition-all duration-300 focus:border-[#4F9AB6] focus:ring-1 focus:ring-[#4F9AB6]"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    className="text-gray-800 transition-all duration-300 focus:border-[#4F9AB6] focus:ring-1 focus:ring-[#4F9AB6]"
                  />
                  <Button className="w-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                    Отправить
                  </Button>
                </div>
              </div>

              <div
                className="bg-blue-600 text-white rounded-lg p-6 shadow-sm transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: "500ms",
                }}
              >
                <h2 className="text-xl font-bold mb-4 drop-shadow-md flex items-center">
                  Поддержка в Telegram 24/7
                  <Image
                    src="/assets/img/icons/telegram_icon_registr.svg"
                    alt="Telegram"
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </h2>
                <p className="mb-6">Наши специалисты всегда на связи и готовы помочь вам в любое время суток</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Ответим на вопросы об обучении
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Поможем с техническими проблемами
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Решим вопросы с оплатой
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span> Подберем подходящую программу
                  </li>
                </ul>
                <Button className="bg-white text-blue-600 hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98]">
                  Написать в Telegram
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

