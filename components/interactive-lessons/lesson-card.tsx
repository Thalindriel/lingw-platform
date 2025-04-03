import Image from "next/image"
import Link from "next/link"

interface LessonCardProps {
  title: string
  description: string
  level: string
  lessonsCount: number
  imageSrc: string
  href: string
}

export function LessonCard({ title, description, level, lessonsCount, imageSrc, href }: LessonCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium">{level}</div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{lessonsCount} уроков</span>
          <Link href={href} className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary-dark">
            Начать
          </Link>
        </div>
      </div>
    </div>
  )
}

