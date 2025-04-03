import { ScheduleEvent } from "@/components/schedule/schedule-event"

interface Event {
  id: string
  time: string
  title: string
  subtitle: string
  description?: string
  teacher?: string
  room?: string
  isDeadline: boolean
}

interface ScheduleDayProps {
  day: string
  dayOfWeek: string
  date: string
  events: Event[]
}

export function ScheduleDay({ day, dayOfWeek, date, events }: ScheduleDayProps) {
  return (
    <div>
      <div className="flex items-start mb-4">
        <div className="flex flex-col items-center mr-6">
          <div className="text-2xl font-bold text-primary">{day}</div>
          <div className="text-xs text-gray-500 uppercase">{dayOfWeek}</div>
        </div>
        <div className="text-gray-600">{date}</div>
      </div>

      <div className="space-y-4 pl-12 border-l-2 border-gray-100">
        {events.map((event) => (
          <ScheduleEvent
            key={event.id}
            time={event.time}
            title={event.title}
            subtitle={event.subtitle}
            description={event.description}
            teacher={event.teacher}
            room={event.room}
            isDeadline={event.isDeadline}
          />
        ))}
      </div>
    </div>
  )
}

