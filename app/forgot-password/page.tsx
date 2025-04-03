import Link from "next/link"
import Image from "next/image"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPassword() {
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
          <h2 className="mt-6 text-center text-2xl font-bold">Восстановление пароля</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Введите ваш email, и мы отправим вам ссылку для сброса пароля
          </p>
        </div>

        <ForgotPasswordForm />

        <div className="text-center mt-4">
          <p className="text-sm">
            Вспомнили пароль?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

