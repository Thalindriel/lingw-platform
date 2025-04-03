"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"

interface ProgramModuleProps {
  title: string
  lessons: string[]
  moduleNumber: number
}

function ProgramModule({ title, lessons, moduleNumber }: ProgramModuleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded-lg mb-4 overflow-hidden bg-white shadow-sm">
      <div className="p-6 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-600 font-light">{lessons.length} уроков</p>
        </div>
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-2 font-medium">
            Модуль {moduleNumber}
          </Button>
          {isOpen ? <ChevronDown className="text-gray-500" /> : <ChevronRight className="text-gray-500" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-6 bg-gray-50 border-t">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lessons.map((lesson, index) => (
              <li key={index} className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2 font-medium">
                  {index + 1}
                </div>
                <span className="font-light">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

interface CourseProgramProps {
  modules: {
    title: string
    lessons: string[]
  }[]
}

export function CourseProgram({ modules }: CourseProgramProps) {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-extrabold mb-8">Программа курса</h2>
      <div>
        {modules.map((module, index) => (
          <ProgramModule key={index} title={module.title} lessons={module.lessons} moduleNumber={index + 1} />
        ))}
      </div>
    </div>
  )
}

