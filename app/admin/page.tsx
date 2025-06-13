"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
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

export function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("full_name, role")
          .eq("user_id", session.user.id)
          .single();

        if (profile) {
          setUserName(profile.full_name || "Пользователь");
          if (profile.role === "admin") setIsAdmin(true);
        }
      }
    };
    fetchSession();
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
          <Link href="/test" className="text-sm font-medium hover:text-primary transition-colors">Тест</Link>
          <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">Курсы</Link>
          <Link href="/support" className="text-sm font-medium hover:text-primary transition-colors">Поддержка</Link>
          <Link href="/contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</Link>
          {isAdmin && (
            <Link href="/admin" className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
              Админ-панель
            </Link>
          )}
        </nav>
      </div>

      <div>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={undefined} alt={userName} />
                <AvatarFallback>{userName?.[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>Профиль</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/login")}>Войти</Button>
            <Button onClick={() => router.push("/register")}>Регистрация</Button>
          </div>
        )}
      </div>
    </header>
  );
}
