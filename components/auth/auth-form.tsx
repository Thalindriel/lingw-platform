"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { createClient } from "@/lib/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (type === "register") {
        if (!email || !password || !fullName) {
          throw new Error("Пожалуйста, заполните все поля");
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data?.user) {
          await supabase.from("user_profiles").insert([
            {
              user_id: data.user.id,
              full_name: fullName,
              language_level: "A1",
              streak_days: 0,
              study_hours: 0,
              words_learned: 0,
            },
          ]);
          setSuccess("Регистрация успешна! Проверьте вашу почту для подтверждения.");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } else {
        if (!email || !password) {
          throw new Error("Пожалуйста, заполните все поля");
        }

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data.session) {
          setSuccess("Авторизация успешна! Перенаправляем...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          throw new Error("Не удалось создать сессию");
        }
      }
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        setError("Нет подключения к серверу.");
      } else if (error.message === "User already registered") {
        setError("Пользователь уже зарегистрирован.");
      } else if (error.message === "Invalid login credentials") {
        setError("Неверный email или пароль.");
      } else if (error.message === "Email not confirmed") {
        setError("Подтвердите email.");
      } else if (error.message.includes("password")) {
        setError("Пароль должен содержать не менее 6 символов.");
      } else {
        setError(error.message || "Произошла ошибка.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "apple" | "telegram") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || "Ошибка входа через соцсеть.");
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="fullName">Имя и фамилия</Label>
            <Input
              id="fullName"
              placeholder="Введите ваше имя и фамилию"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12"
          />
        </div>
        <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : type === "login" ? "Войти" : "Зарегистрироваться"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">или</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={() => handleSocialAuth("google")}
        >
          <Image src="/assets/img/google_icon.svg" alt="Google" width={24} height={24} />
          <span className="sr-only">Google</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={() => handleSocialAuth("apple")}
        >
          <Icons.apple className="h-5 w-5" />
          <span className="sr-only">Apple</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={() => handleSocialAuth("telegram")}
        >
          <Image src="/assets/img/icons/telegram_icon_registr.svg" alt="Telegram" width={24} height={24} />
          <span className="sr-only">Telegram</span>
        </Button>
      </div>
    </div>
  );
}
