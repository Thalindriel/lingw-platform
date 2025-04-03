import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function VerifyEmail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center">
              <Image src="/assets/img/logo_icon.svg" alt="LingW" width={40} height={40} />
              <span className="text-xl font-bold ml-2">LingW</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold">Подтвердите ваш email</h2>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <p className="mb-4">
            Мы отправили письмо с ссылкой для подтверждения на ваш email. Пожалуйста, проверьте вашу почту и перейдите
            по ссылке для завершения регистрации.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Если вы не получили письмо, проверьте папку "Спам" или попробуйте зарегистрироваться снова.
          </p>

          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/login">Вернуться на страницу входа</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

