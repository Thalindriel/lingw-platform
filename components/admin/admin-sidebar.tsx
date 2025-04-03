"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    { name: "Дашборд", href: "/admin" },
    { name: "Пользователи", href: "/admin/users" },
    { name: "Курсы", href: "/admin/courses" },
    { name: "Уроки", href: "/admin/lessons" },
    { name: "Расписание", href: "/admin/schedule" },
    { name: "Платежи", href: "/admin/payments" },
    { name: "Настройки", href: "/admin/settings" },
  ]

  return (
    <div className="w-64 bg-white border-r min-h-screen">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="LingW" width={100} height={32} />
          <span className="ml-2 font-bold">Admin</span>
        </Link>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md ${
                  isActive(item.href) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

