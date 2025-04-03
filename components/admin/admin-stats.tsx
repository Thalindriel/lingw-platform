export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-gray-500 mb-2">Всего пользователей</div>
        <div className="text-3xl font-bold">1,254</div>
        <div className="text-green-500 text-sm mt-2">+12% с прошлого месяца</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-gray-500 mb-2">Активных курсов</div>
        <div className="text-3xl font-bold">24</div>
        <div className="text-green-500 text-sm mt-2">+3 новых курса</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-gray-500 mb-2">Проведено уроков</div>
        <div className="text-3xl font-bold">8,567</div>
        <div className="text-green-500 text-sm mt-2">+5% с прошлой недели</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-gray-500 mb-2">Доход за месяц</div>
        <div className="text-3xl font-bold">₽1.2M</div>
        <div className="text-green-500 text-sm mt-2">+8% с прошлого месяца</div>
      </div>
    </div>
  )
}

