"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function ProfileTabs() {
  const pathname = usePathname()

  const tabs = [
    { name: "Профиль", href: "/profile" },
    { name: "Мои курсы", href: "/profile/courses" },
    { name: "Расписание", href: "/profile/schedule" },
  ]

  return (
    <div className="border-b">
      <nav className="flex space-x-8">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

