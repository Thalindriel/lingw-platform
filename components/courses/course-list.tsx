"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  price: number
  color: string
  slug: string
}

export function CourseList() {
  const [loading, setLoading] = useState(true)

  // Static data for courses since we don't have a database table yet
  const coursesData = [
    {
      id: "beginner",
      title: "Английский с нуля",
      description:
        "Освойте навыки по английскому для любых жизненных ситуаций с нашим комплексным курсом для начинающих",
      price: 11000,
      color: "rgb(176,69,64)",
      slug: "beginner",
    },
    {
      id: "conversation",
      title: "Разговорный английский",
      description: "Курс разработан специально для тех, кто хочет научиться свободно общаться на английском языке",
      price: 12500,
      color: "rgb(201,132,66)",
      slug: "conversation",
    },
    {
      id: "business",
      title: "Деловой английский",
      description:
        "Курс, ориентированный на изучение английского языка в профессиональной среде, бизнес-лексика и этикет",
      price: 14000,
      color: "rgb(78,135,160)",
      slug: "business",
    },
    {
      id: "exams",
      title: "Подготовка к TOEFL и IELTS",
      description: "Курс подготовки к международным экзаменам для студентов и профессионалов",
      price: 30000,
      color: "rgb(110,90,140)",
      slug: "exams",
    },
  ]

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {coursesData.map((course) => (
        <div
          key={course.id}
          className="rounded-lg overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${course.color} 0%, ${adjustColor(course.color, -20)} 100%)`,
          }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-md">{course.title}</h2>
            <p className="text-white/90 mb-4">{course.description}</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start text-white/90">
                <span className="text-white mr-2">✓</span>
                <span>Индивидуальный подход</span>
              </li>
              <li className="flex items-start text-white/90">
                <span className="text-white mr-2">✓</span>
                <span>Практические задания</span>
              </li>
              <li className="flex items-start text-white/90">
                <span className="text-white mr-2">✓</span>
                <span>Обратная связь от преподавателя</span>
              </li>
              <li className="flex items-start text-white/90">
                <span className="text-white mr-2">✓</span>
                <span>Сертификат по окончании</span>
              </li>
            </ul>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">
                {course.price}₽ <span className="text-white/50 text-sm">в месяц</span>
              </span>
              <Link href={`/courses/${course.slug}`}>
                <Button variant="outline" className="bg-white hover:bg-white/90">
                  Подробнее
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  // Parse the RGB values from the color string
  const rgbMatch = color.match(/rgb$$(\d+),(\d+),(\d+)$$/)
  if (!rgbMatch) return color

  const r = Math.max(0, Math.min(255, Number.parseInt(rgbMatch[1]) + amount))
  const g = Math.max(0, Math.min(255, Number.parseInt(rgbMatch[2]) + amount))
  const b = Math.max(0, Math.min(255, Number.parseInt(rgbMatch[3]) + amount))

  return `rgb(${r},${g},${b})`
}

