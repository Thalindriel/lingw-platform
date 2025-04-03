import Link from "next/link"

interface LessonCardProps {
  title: string
  subtitle: string
  duration: number
  progress: number
  nextTopic: string
  daysLeft: number
}

export function LessonCard({ title, subtitle, duration, progress, nextTopic, daysLeft }: LessonCardProps) {
  return (
    <div className="bg-secondary rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
        <div className="bg-white rounded-full p-2 text-xs text-gray-600">{duration} минут</div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Прогресс урока</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-medium">Следующая тема</div>
        <div className="flex justify-between">
          <span>{nextTopic}</span>
          <span className="text-gray-600 text-sm">Осталось: {daysLeft} дня</span>
        </div>
      </div>

      <Link
        href={`/lessons/${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="block w-full px-4 py-2 bg-primary text-white text-center rounded-md hover:bg-primary-dark"
      >
        Продолжить
      </Link>
    </div>
  )
}

