"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Teacher {
  name: string
  experience: string
  image: string
}

interface TeacherSliderProps {
  teachers: Teacher[]
}

export function TeacherSlider({ teachers }: TeacherSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleTeachers, setVisibleTeachers] = useState(4)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Определяем количество видимых преподавателей в зависимости от ширины экрана
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleTeachers(1)
      } else if (window.innerWidth < 1024) {
        setVisibleTeachers(2)
      } else {
        setVisibleTeachers(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Функции для управления слайдером
  const nextSlide = () => {
    if (currentSlide < teachers.length - visibleTeachers) {
      setCurrentSlide((prev) => prev + 1)
    } else {
      setCurrentSlide(0) // Возвращаемся к началу
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    } else {
      setCurrentSlide(teachers.length - visibleTeachers) // Переходим в конец
    }
  }

  // Вычисляем видимых преподавателей
  const displayedTeachers = teachers.slice(currentSlide, currentSlide + visibleTeachers)

  // Если слайдер не заполнен, добавляем преподавателей с начала
  if (displayedTeachers.length < visibleTeachers) {
    const additionalTeachers = teachers.slice(0, visibleTeachers - displayedTeachers.length)
    displayedTeachers.push(...additionalTeachers)
  }

  return (
    <div className="relative">
      {/* Slider Controls */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Следующий слайд"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Teachers Slider */}
      <div ref={sliderRef} className="overflow-hidden px-4">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / visibleTeachers)}%)`,
            width: `${(teachers.length / visibleTeachers) * 100}%`,
          }}
        >
          {teachers.map((teacher, index) => (
            <div key={index} className="flex-shrink-0 px-4" style={{ width: `${100 / teachers.length}%` }}>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative">
                  <Image src={teacher.image || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-center">{teacher.name}</h3>
                <p className="text-sm text-gray-600 text-center">{teacher.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(teachers.length / visibleTeachers) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              Math.floor(currentSlide / visibleTeachers) === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index * visibleTeachers)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

