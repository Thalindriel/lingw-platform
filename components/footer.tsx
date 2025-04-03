import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="w-full bg-[#3a8dae] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center">
                <Image src="/assets/img/logo_icon.svg" alt="LingW" width={40} height={40} />
                <span className="text-xl font-bold ml-2">LingW</span>
              </div>
            </Link>
            <p className="text-sm font-light">Изучайте английский язык онлайн с профессиональными преподавателями</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-extrabold">Контакты</h3>
            <div className="space-y-2">
              <p className="text-sm flex items-center font-light">
                <Image src="/assets/img/icons/phone_icon.svg" alt="Phone" width={24} height={24} className="mr-2" />
                +7 (999) 999-99-99
              </p>
              <p className="text-sm flex items-center font-light">
                <Image src="/assets/img/icons/email_icon.svg" alt="Email" width={24} height={24} className="mr-2" />
                LingWLearn@gmail.com
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-extrabold">Социальные сети</h3>
            <div className="space-y-2">
              <Link href="https://vk.com" className="text-sm flex items-center hover:underline font-light">
                <Image src="/assets/img/icons/vk_icon.svg" alt="VK" width={24} height={24} className="mr-2" />
                ВКонтакте
              </Link>
              <Link href="https://t.me" className="text-sm flex items-center hover:underline font-light">
                <Image
                  src="/assets/img/icons/telegram_icon.svg"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Telegram
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-extrabold">Оставайтесь на связи</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/70 h-10 rounded-r-none"
                />
                <Button className="bg-[#F7B471] text-white hover:bg-[#F7B471]/90 font-medium rounded-l-none">
                  Подписаться
                </Button>
              </div>
              <p className="text-xs font-light">
                Подпишитесь на нашу рассылку, чтобы получать новости и специальные предложения
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-10 pt-6 border-t border-white/20 text-xs font-light">
          <span>© {new Date().getFullYear()} LingW. Все права защищены</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:underline">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:underline">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

