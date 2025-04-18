"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { Menu, X } from "lucide-react";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setIsLoggedIn(true);
        setUserName(session.user.user_metadata?.full_name || "");
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

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

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/assets/img/avatar.png" alt={userName} />
                <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Личный кабинет</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Вход</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Регистрация</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
