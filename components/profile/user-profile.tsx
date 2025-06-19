"use client"

import { useState, useEffect, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { v4 as uuidv4 } from "uuid"

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
  avatar_url?: string | null
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

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
          .limit(1)
          .maybeSingle()

        if (error) throw error

        if (data) {
          setProfile(data)
          setFullName(data.full_name)
          setPhone(data.phone || "")
        }
      } catch (error: any) {
        console.error("Error loading profile:", error.message)
        setError("Не удалось загрузить профиль.")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router])

  const handleAvatarUpload = async () => {
  if (!avatarFile || !profile) return null

  const supabase = createClient()
  const fileExt = avatarFile.name.split(".").pop()
  const filePath = `avatars/${profile.user_id}-${uuidv4()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, avatarFile, {
      upsert: true,
    })

  if (uploadError) {
    console.error("Ошибка при загрузке аватара:", uploadError.message)
    setError("Ошибка загрузки аватара.")
    return null
  }

  const { data: publicUrl } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath)

  return publicUrl?.publicUrl || null
}

  const handleSave = async () => {
    if (!profile) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    const supabase = createClient()

    try {
      let avatar_url = profile.avatar_url || null
      if (avatarFile) {
        const uploadedUrl = await handleAvatarUpload()
        if (uploadedUrl) avatar_url = uploadedUrl
      }

      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: fullName,
          phone,
          avatar_url,
        })
        .eq("id", profile.id)

      if (error) throw error

      setProfile({ ...profile, full_name: fullName, phone, avatar_url })
      setIsEditing(false)
      setAvatarFile(null)
      setSuccess("Профиль обновлён!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error: any) {
      console.error("Error updating profile:", error.message)
      setError("Не удалось обновить профиль.")
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
        <div className="md:w-1/4 flex flex-col items-center">
          <Avatar className="w-40 h-40 border-4 border-primary shadow-md">
            <AvatarImage
              src={profile.avatar_url || "/assets/img/default-avatar.png"}
              alt={profile.full_name}
            />
            <AvatarFallback>
              {profile.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <div className="mt-4 w-full">
              <Input
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAvatarFile(e.target.files?.[0] || null)
                }
              />
            </div>
          )}
        </div>

        <div className="md:w-3/4">
          {isEditing ? (
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
                  className="max-w-md"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90">
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
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setFullName(profile.full_name)
                    setPhone(profile.phone || "")
                    setAvatarFile(null)
                  }}
                  disabled={saving}
                >
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500">Имя:</p>
                <p className="font-medium">{profile.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email:</p>
                <p className="font-medium">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Телефон:</p>
                <p className="font-medium">{profile.phone || "Не указан"}</p>
              </div>
              <div>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  Редактировать
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
