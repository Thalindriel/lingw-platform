"use client"
import { ChevronRight } from "lucide-react"

interface CourseModuleProps {
  title: string
  lessonsCount: number
  weeksCount: number
  moduleNumber: number
  lessons: string[]
  isOpen: boolean
  onToggle: () => void
}

export function CourseModule({
  title,
  lessonsCount,
  weeksCount,
  moduleNumber,
  lessons,
  isOpen,
  onToggle,
}: CourseModuleProps) {
  return (
    <div className="border border-[#E5E7EB] rounded-lg mb-4 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div
        className="p-4 flex justify-between items-center cursor-pointer transition-colors duration-200 hover:bg-gray-50"
        onClick={onToggle}
      >
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex text-sm text-gray-500 space-x-4">
            <span>{lessonsCount} уроков</span>
            <span>
              {weeksCount} {weeksCount === 1 ? "неделя" : "недели"}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-gray-500 mr-2">Модуль {moduleNumber}</div>
          <div
            className="transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            <ChevronRight className="text-gray-500" />
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? `${lessons.length * 30 + 32}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="p-4 bg-gray-50 border-t">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lessons.map((lesson, index) => (
              <li
                key={index}
                className="flex items-center transition-all duration-300"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2 font-medium">
                  {index + 1}
                </div>
                <span className="font-light">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

