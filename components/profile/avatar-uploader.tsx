"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"

export default function AvatarUploader({
  userId,
  onUpload,
}: {
  userId: string
  onUpload: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const supabase = createClient()
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const fileExt = file.name.split(".").pop()
    const filePath = `${userId}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      console.error("Ошибка загрузки:", uploadError)
      setUploading(false)
      return
    }

    const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(filePath)

    if (publicUrl?.publicUrl) {
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ avatar_url: publicUrl.publicUrl })
        .eq("user_id", userId)

      if (!updateError) onUpload(publicUrl.publicUrl)
    }

    setUploading(false)
  }

  return (
    <div className="space-y-2">
      <Input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
      {uploading && (
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Icons.spinner className="w-4 h-4 animate-spin" /> Загрузка...
        </div>
      )}
    </div>
  )
}
