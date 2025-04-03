export function PopularCourses() {
  const courses = [
    { id: 1, name: "Английский с нуля", students: 245, revenue: "₽2.7M", rating: 4.8 },
    { id: 2, name: "Разговорный английский", students: 189, revenue: "₽2.3M", rating: 4.7 },
    { id: 3, name: "Деловой английский", students: 156, revenue: "₽2.1M", rating: 4.9 },
    { id: 4, name: "Подготовка к TOEFL/IELTS", students: 132, revenue: "₽3.9M", rating: 4.6 },
    { id: 5, name: "Грамматика для продвинутых", students: 98, revenue: "₽1.2M", rating: 4.5 },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold mb-4">Популярные курсы</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Название</th>
              <th className="text-left py-2 px-4">Студенты</th>
              <th className="text-left py-2 px-4">Доход</th>
              <th className="text-left py-2 px-4">Рейтинг</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b">
                <td className="py-2 px-4">{course.name}</td>
                <td className="py-2 px-4">{course.students}</td>
                <td className="py-2 px-4">{course.revenue}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <span className="mr-1">{course.rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <a href="/admin/courses" className="text-primary hover:underline">
          Посмотреть все курсы
        </a>
      </div>
    </div>
  )
}

