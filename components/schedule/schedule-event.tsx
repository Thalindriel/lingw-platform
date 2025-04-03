"use client"

interface ScheduleEventProps {
  time: string
  title: string
  subtitle: string
  description?: string
  teacher?: string
  room?: string
  isDeadline: boolean
}

export function ScheduleEvent({ time, title, subtitle, description, teacher, room, isDeadline }: ScheduleEventProps) {
  return (
    <div className="relative">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${isDeadline ? "bg-red-500" : "bg-primary"}`}
        style={{ left: "-9px" }}
      ></div>

      <div className="bg-white rounded-lg border p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-bold">{time}</div>
            <div className="font-medium">{title}</div>
            <div className="text-gray-600">{subtitle}</div>

            {description && <div className="mt-2 text-sm text-gray-600">{description}</div>}

            {(teacher || room) && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                {teacher && (
                  <div className="flex items-center mr-4">
                    <span>{teacher}</span>
                  </div>
                )}

                {room && (
                  <div className="flex items-center">
                    <span>{room}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 md:mt-0">
            {isDeadline ? (
              <button className="px-4 py-2 bg-red-100 text-red-600 rounded-md text-sm font-medium hover:bg-red-200">
                Сдать работу
              </button>
            ) : (
              <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark">
                Присоединиться
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

