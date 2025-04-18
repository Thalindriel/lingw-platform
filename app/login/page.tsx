"use client";

import Link from "next/link";
import Image from "next/image";
import { AuthForm } from "@/components/auth/auth-form";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: profile, error } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();

        if (!error && profile?.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      } else {
        setLoading(false);
      }
    };

    checkRole();
  }, [router]);

  if (loading) return null;

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
            Ещё нет аккаунта?{" "}
            <Link 
              href="/register" 
              className="text-primary hover:underline"
              prefetch
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>

        {/* Администратору */}
        <div className="text-center mt-2">
          <p className="text-sm text-muted-foreground">
            Если вы администратор, используйте ваш логин для перехода в
            <Link href="/admin" className="text-primary hover:underline ml-1">
              панель управления
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
