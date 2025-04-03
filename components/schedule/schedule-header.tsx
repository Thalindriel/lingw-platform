"use client"

import { useState } from "react"
import Link from "next/link"

export function ScheduleHeader() {
  const [viewType, setViewType] = useState<"calendar" | "list">("list")

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Календарь занятий</h1>
        <p className="text-gray-600">Ближайшие занятия и дедлайны</p>
      </div>

      <div className="flex space-x-2 mt-4 sm:mt-0">
        <button
          onClick={() => setViewType("calendar")}
          className={`px-4 py-2 rounded-md border ${
            viewType === "calendar" ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Календарь
        </button>

        <Link
          href="/schedule/add"
          className="px-4 py-2 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          Добавить
        </Link>
      </div>
    </div>
  )
}

