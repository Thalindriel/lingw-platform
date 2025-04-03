export function RecentUsers() {
  const users = [
    { id: 1, name: "Анна Иванова", email: "anna@example.com", date: "2023-03-28", status: "active" },
    { id: 2, name: "Иван Петров", email: "ivan@example.com", date: "2023-03-27", status: "active" },
    { id: 3, name: "Мария Сидорова", email: "maria@example.com", date: "2023-03-26", status: "inactive" },
    { id: 4, name: "Алексей Смирнов", email: "alexey@example.com", date: "2023-03-25", status: "active" },
    { id: 5, name: "Екатерина Козлова", email: "ekaterina@example.com", date: "2023-03-24", status: "active" },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold mb-4">Недавние пользователи</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Имя</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Дата регистрации</th>
              <th className="text-left py-2 px-4">Статус</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.date}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status === "active" ? "Активен" : "Неактивен"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <a href="/admin/users" className="text-primary hover:underline">
          Посмотреть всех пользователей
        </a>
      </div>
    </div>
  )
}

