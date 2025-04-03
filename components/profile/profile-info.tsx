"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

export function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Дмитрий Коротков")
  const [email, setEmail] = useState("dmitry@example.com")
  const [phone, setPhone] = useState("+7 (999) 123-45-67")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save changes to database
    setIsEditing(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-bold mb-6">Личные данные</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full border-2 border-primary overflow-hidden">
            <Image
              src="/assets/img/bruce.png"
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-grow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Отмена
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-grow">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500">Имя:</p>
                <p className="font-medium">{name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email:</p>
                <p className="font-medium">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Телефон:</p>
                <p className="font-medium">{phone}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Редактировать
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

