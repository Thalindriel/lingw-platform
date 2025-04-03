"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase/client"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  isLoggedIn?: boolean
  userName?: string
}

export function Header({ isLoggedIn = false, userName = "" }: HeaderProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b bg-white sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center">
          <Image src="/assets/img/logo_icon.svg" alt="LingW" width={40} height={40} />
          <span className="text-xl font-bold ml-2">LingW</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/test" className="text-sm font-medium hover:text-primary transition-colors">
            Тест
          </Link>
          <Link href="/lessons" className="text-sm font-medium hover:text-primary transition-colors">
            Уроки
          </Link>
          <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
            Курсы
          </Link>
          <Link href="/support" className="text-sm font-medium hover:text-primary transition-colors">
            Поддержка
          </Link>
          <Link href="/contacts" className="text-sm font-medium hover:text-primary transition-colors">
            Контакты
          </Link>
        </nav>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/assets/img/mainpic.png" alt={userName} />
                  <AvatarFallback>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    <span id="user-email">Загрузка...</span>
                  </p>
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                      (async function() {
                        const { data } = await window.supabase.auth.getSession();
                        if (data.session) {
                          document.getElementById('user-email').textContent = data.session.user.email;
                        }
                      })();
                    `,
                    }}
                  />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Дашборд</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">Профиль</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/schedule">Расписание</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/progress">Прогресс</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Войти
            </Link>
            <Button asChild className="bg-[#4F9AB6] hover:bg-[#4F9AB6]/90 font-medium rounded-full">
              <Link href="/register">Зарегистрироваться</Link>
            </Button>
          </>
        )}
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-16 md:hidden">
          <div className="container mx-auto px-6 py-8">
            <nav className="flex flex-col gap-4">
              <Link href="/test" className="text-lg font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>
                Тест
              </Link>
              <Link href="/lessons" className="text-lg font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>
                Уроки
              </Link>
              <Link href="/courses" className="text-lg font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>
                Курсы
              </Link>
              <Link href="/support" className="text-lg font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>
                Поддержка
              </Link>
              <Link href="/contacts" className="text-lg font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>
                Контакты
              </Link>

              <div className="mt-6 flex flex-col gap-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium py-2 border-b"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Дашборд
                    </Link>
                    <Link
                      href="/profile"
                      className="text-lg font-medium py-2 border-b"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Профиль
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="text-lg font-medium py-2 text-red-500"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-lg font-medium py-2 border-b"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Войти
                    </Link>
                    <Link
                      href="/register"
                      className="bg-primary text-white py-3 px-4 rounded-lg text-center font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Зарегистрироваться
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

