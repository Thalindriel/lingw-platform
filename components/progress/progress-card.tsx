interface ProgressCardProps {
  title: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
}

export function ProgressCard({ title, progress, lessonsCompleted, totalLessons }: ProgressCardProps) {
  return (
    <div className="bg-secondary rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600 text-sm">
            Пройдено {lessonsCompleted} из {totalLessons} уроков
          </p>
        </div>
        <div className="text-2xl font-bold text-primary">{progress}%</div>
      </div>

      <div className="mt-4 progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}

