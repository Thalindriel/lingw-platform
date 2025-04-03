import Link from "next/link"

interface CourseCardProps {
  title: string
  description: string
  price: number
  color: string
  href: string
}

export function CourseCard({ title, description, price, color, href }: CourseCardProps) {
  return (
    <div className={`${color} text-white rounded-lg p-6 flex flex-col h-full`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/90 text-sm mb-6 flex-grow">{description}</p>
      <div className="mt-auto">
        <div className="text-lg font-bold mb-4">
          {price}₽ <span className="text-sm font-normal">в месяц</span>
        </div>
        <Link
          href={href}
          className="inline-block px-4 py-2 bg-white text-gray-800 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}

