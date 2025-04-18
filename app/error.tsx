"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error("Global error caught:", error)
  }, [error])

  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-2xl shadow-md animate-fade-in">
          <div className="flex flex-col items-center space-y-4">
            <Icons.alert className="w-12 h-12 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800">Что-то пошло не так</h2>
            <p className="text-gray-500 text-sm">
              При загрузке страницы возникла ошибка. Пожалуйста, попробуйте снова.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={reset} className="bg-primary hover:bg-primary/90">
              Повторить
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              На главную
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
