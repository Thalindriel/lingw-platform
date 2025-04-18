"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AuthForm } from "@/components/auth/auth-form";
import { useSupabase } from "@/components/providers/supabase-provider";

export default function Login() {
  const router = useRouter();
  const { session } = useSupabase();

  useEffect(() => {
    if (session) {
      console.log("Авторизация успешна. Перенаправляем на /dashboard");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
    }
  }, [session]);

  if (session === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Вы уже вошли. Перенаправляем...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center">
              <Image 
                src="/assets/img/logo_icon.svg" 
                alt="LingW" 
                width={40} 
                height={40} 
                priority
              />
              <span className="text-xl font-bold ml-2">LingW</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold">Вход в LingW</h2>
        </div>

        <AuthForm type="login" />

        <div className="text-center mt-4">
          <p className="text-sm">
            Еще нет аккаунта?{" "}
            <Link 
              href="/register" 
              className="text-primary hover:underline"
              prefetch
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
