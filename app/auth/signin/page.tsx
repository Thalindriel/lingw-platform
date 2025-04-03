import Link from "next/link"
import Image from "next/image"
import { SignInForm } from "@/components/auth/signin-form"

export default function SignIn() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <Image src="/logo.svg" alt="LingW" width={100} height={32} />
          </Link>
          <h2 className="text-2xl font-bold">Вход в LingW</h2>
        </div>

        <SignInForm />

        <div className="flex items-center justify-center space-x-4 mt-6">
          <button className="p-2 rounded-full border">
            <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
          </button>
          <button className="p-2 rounded-full border">
            <Image src="/apple-icon.svg" alt="Apple" width={24} height={24} />
          </button>
          <button className="p-2 rounded-full border">
            <Image src="/telegram-icon.svg" alt="Telegram" width={24} height={24} />
          </button>
        </div>

        <div className="text-center mt-6">
          <p>
            Забыли пароль?{" "}
            <Link href="/auth/reset-password" className="text-primary hover:underline">
              Восстановить
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

