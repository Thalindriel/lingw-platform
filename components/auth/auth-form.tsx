"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/client";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
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
            data: { full_name: fullName }
          }
        });

        if (signUpError) throw signUpError;

        await supabase.from("user_profiles").insert([
          {
            user_id: data.user?.id,
            full_name: fullName,
            language_level: "A1",
            streak_days: 0,
            study_hours: 0,
            words_learned: 0,
          },
        ]);

        setSuccess("Регистрация прошла успешно! Подтвердите email через ссылку.");
        setTimeout(() => router.push("/login"), 3000);

      } else {
        if (step === "credentials") {
          if (!email || !password) throw new Error("Введите email и пароль");

          const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) throw signInError;

          const { error: otpError } = await supabase.auth.signInWithOtp({ email });

          if (otpError) throw otpError;

          setSuccess("Код подтверждения отправлен на почту");
          setStep("otp");

        } else if (step === "otp") {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "email",
          });

          if (verifyError) throw verifyError;

          setSuccess("Успешный вход!");
          setTimeout(() => router.push("/profile"), 1500);
        }
      }
    } catch (error: any) {
      setError(error.message || "Произошла ошибка");
    } finally {
      setLoading(false);
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

        {step === "credentials" && (
          <>
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
          </>
        )}

        {type === "login" && step === "otp" && (
          <div className="space-y-2">
            <Label htmlFor="otp">Код из письма</Label>
            <Input
              id="otp"
              placeholder="Введите код"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-12"
            />
          </div>
        )}

        <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : type === "login"
            ? step === "otp"
              ? "Подтвердить вход"
              : "Войти"
            : "Зарегистрироваться"}
        </Button>
      </form>
    </div>
  );
}
