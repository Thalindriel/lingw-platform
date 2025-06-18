"use client"

import { useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function ContactsPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    const formData = new FormData(formRef.current!)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    const supabase = createClient()
    const { error } = await supabase.from("support_requests").insert({
      name,
      email,
      message,
    })

    if (!error) {
      setSuccess(true)
      formRef.current?.reset()
    }

    setSending(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center">Контакты</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h2 className="text-xl font-bold mb-6">Свяжитесь с нами</h2>

              <div className="space-y-6">
                {/* Телефон */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Image src="/assets/img/icons/phone-icon.svg" alt="Phone" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">Телефон</h3>
                    <p className="text-gray-600">+7 (999) 999-99-99</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Image src="/assets/img/icons/mail-icon.svg" alt="Email" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">LingWLearn@gmail.com</p>
                  </div>
                </div>

                {/* Telegram */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Image src="/assets/img/icons/telegram_icon.svg" alt="Telegram" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">Telegram</h3>
                    <p className="text-gray-600">@LingW_support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Форма отправки */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-6">Напишите нам</h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <Input name="name" placeholder="Ваше имя" required className="text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input name="email" type="email" placeholder="Ваш email" required className="text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                  <Textarea name="message" placeholder="Ваше сообщение" rows={5} required className="text-gray-800" />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  disabled={sending}
                >
                  {sending ? "Отправка..." : "Отправить"}
                </Button>
                {success && <p className="text-green-600 text-sm mt-2">Сообщение отправлено!</p>}
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
