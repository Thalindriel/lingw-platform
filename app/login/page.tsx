"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { AuthForm } from "@/components/auth/auth-form"
import { supabase } from "@/lib/supabase/client"

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Ошибка при проверке авторизации:", error);
          setIsAuthenticated(false);
        } else if (data.session) {
          console.log("Пользователь авторизован, перенаправляем на дашборд");
          setIsAuthenticated(true);
          router.replace("/dashboard");
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Ошибка:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Загрузка...</p>
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
  )
}
