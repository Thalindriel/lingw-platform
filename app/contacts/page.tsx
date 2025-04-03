import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function ContactsPage() {
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
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Image
                      src="/assets/img/icons/phone-icon.svg"
                      alt="Phone"
                      width={24}
                      height={24}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Телефон</h3>
                    <p className="text-gray-600">+7 (999) 999-99-99</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Image
                      src="/assets/img/icons/mail-icon.svg"
                      alt="Email"
                      width={24}
                      height={24}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">LingWLearn@gmail.com</p>
                  </div>
                </div>

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

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-6">Напишите нам</h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <Input placeholder="Ваше имя" className="text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" placeholder="Ваш email" className="text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                  <Textarea placeholder="Ваше сообщение" rows={5} className="text-gray-800" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Отправить
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

