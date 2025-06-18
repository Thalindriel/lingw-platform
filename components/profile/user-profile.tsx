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
import AvatarUploader from "@/components/profile/avatar-uploader"

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

  useEffect(() => {
    const supabase = createClient()

    async function loadProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession()

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
      <div className="flex justify-cent
