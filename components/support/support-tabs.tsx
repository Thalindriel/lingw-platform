"use client"

import { useState } from "react"

export function SupportTabs() {
  const [activeTab, setActiveTab] = useState<"chat" | "form">("chat")

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setActiveTab("chat")}
        className={`flex-1 py-3 px-4 rounded-md text-center ${
          activeTab === "chat" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Чат поддержки
      </button>
      <button
        onClick={() => setActiveTab("form")}
        className={`flex-1 py-3 px-4 rounded-md text-center ${
          activeTab === "form" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Форма обращения
      </button>
    </div>
  )
}

