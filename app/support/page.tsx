"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactForm } from "@/components/support/contact-form"

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-6 text-center">Поддержка LingW</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-xl font-bold mb-6">Как мы можем помочь?</h2>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Ответим на вопросы об обучении и курсах</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Поможем с техническими проблемами</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Решим вопросы с оплатой</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>Подберем подходящую программу обучения</p>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="chat" className="rounded-md">
                    Чат поддержки
                  </TabsTrigger>
                  <TabsTrigger value="form" className="rounded-md">
                    Форма обращения
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Telegram поддержка 24/7</h3>
                    <p className="text-gray-600 mb-4">
                      Наши специалисты всегда на связи и готовы помочь вам в любое время суток
                    </p>
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 w-full"
                    >
                      <a
                        href="https://t.me/thalindriel"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Написать в Telegram
                      </a>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="form" className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <ContactForm />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="bg-[#3a8dae] text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Частые вопросы</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#3a8dae]/80 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Как начать обучение?</h3>
                  <p className="text-white/90 text-sm">
                    Запишитесь на бесплатный пробный урок, где мы определим ваш уровень и подберем подходящую программу
                    обучения.
                  </p>
                </div>

                <div className="bg-[#3a8dae]/80 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Какие способы оплаты?</h3>
                  <p className="text-white/90 text-sm">
                    Мы принимаем оплату картами Visa, Mastercard, МИР, а также через СБП и электронные кошельки.
                  </p>
                </div>

                <div className="bg-[#3a8dae]/80 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Как проходят занятия?</h3>
                  <p className="text-white/90 text-sm">
                    Занятия проходят онлайн в удобное для вас время. Длительность урока — 60 минут.
                  </p>
                </div>

                <div className="bg-[#3a8dae]/80 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Можно ли заморозить обучение?</h3>
                  <p className="text-white/90 text-sm">
                    Да, вы можете приостановить обучение на срок до 30 дней с сохранением оплаченных занятий.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
