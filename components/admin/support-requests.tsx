"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSupportRequests() {
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("support_requests").select("*").order("created_at", { ascending: false })
      if (!error) setRequests(data)
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Обращения пользователей</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-sm text-gray-500">Пока нет обращений</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="border rounded p-4">
              <p><strong>Имя:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Сообщение:</strong> {req.message}</p>
              <p className="text-xs text-gray-500 mt-2">{new Date(req.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
