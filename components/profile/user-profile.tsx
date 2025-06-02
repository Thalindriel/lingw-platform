"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UserProfile {
  id: string
  user_id: string
  full_name: string
  language_level: string
  streak_days: number
  study_hours: number
  words_learned: number
  phone: string | null
  created_at: string
}

export function UserProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    async function loadProfile() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/login")
          return
        }

        setEmail(session.user.email)

        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single()

        if (error) throw error

        if (data) {
          setProfile(data)
          setFullName(data.full_name)
          setPhone(data.phone || "")
        }
      } catch (error: any) {
        console.error("Error loading profile:", error.message)
        setError("Не удалось загрузить профиль. Пожалуйста, попробуйте позже.")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router])

  const handleSave = async () => {
    if (!profile) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: fullName,
          phone,
        })
        .eq("id", profile.id)

      if (error) throw error

      setProfile({
        ...profile,
        full_name: fullName,
        phone,
      })

      setIsEditing(false)
      setSuccess("Профиль успешно обновлен!")

      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (error: any) {
      console.error("Error updating profile:", error.message)
      setError("Не удалось обновить профиль. Пожалуйста, попробуйте позже.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!profile) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Профиль не найден. Пожалуйста, попробуйте войти снова.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Личные данные</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 mb-4">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 flex justify-center">
          <Avatar className="w-32 h-32 border-2 border-gray-200">
            <AvatarImage src="/assets/img/bruce.png" alt={profile.full_name} />
            <AvatarFallback>
              {profile.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {isEditing ? (
          <div className="md:w-3/4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Имя и фамилия</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="max-w-md"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" disabled={saving}>
                  {saving ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    "Сохранить"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setFullName(profile.full_name)
                    setPhone(profile.phone || "")
                  }}
                  disabled={saving}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500">Имя:</p>
                <p className="font-medium">{profile.full_name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email:</p>
                <p className="font-medium">{email || "Загрузка..."}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Телефон:</p>
                <p className="font-medium">{profile.phone || "Не указан"}</p>
              </div>

              <div>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Редактировать
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
