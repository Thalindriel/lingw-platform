import Link from "next/link"
import Image from "next/image"
import { AuthForm } from "@/components/auth/auth-form"

export default function Register() {
  // Проверяем наличие переменных окружения
  const hasSupabaseEnv =
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

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
          <h2 className="mt-6 text-center text-2xl font-bold">Регистрация в LingW</h2>

          {/* Добавляем предупреждение, если переменные окружения отсутствуют */}
          {!hasSupabaseEnv && (
            <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-sm rounded-md">
              Внимание: Отсутствуют необходимые настройки для подключения к серверу. Регистрация может не работать.
            </div>
          )}
        </div>

        <AuthForm type="register" />

        <div className="text-center mt-4">
          <p className="text-sm">
            Уже зарегистрированы?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

