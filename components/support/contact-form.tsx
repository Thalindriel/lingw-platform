"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSent, setIsSent] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !message) return

    const { error } = await supabase.from("support_requests").insert({
      name,
      email,
      message,
    })

    if (!error) {
      setIsSent(true)
      setName("")
      setEmail("")
      setMessage("")
    } else {
      console.error("Ошибка при отправке сообщения:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Textarea
        placeholder="Ваше сообщение"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        Отправить
      </Button>
      {isSent && <p className="text-green-600 text-sm">Спасибо за обращение! Мы свяжемся с вами в ближайшее время.</p>}
    </form>
  )
}
