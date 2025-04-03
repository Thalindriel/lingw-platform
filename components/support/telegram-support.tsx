import Link from "next/link"

export function TelegramSupport() {
  return (
    <div className="bg-primary text-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-2">Telegram поддержка 24/7</h3>

      <p className="mb-4">Наши специалисты всегда на связи и готовы помочь вам в любое время суток.</p>

      <ul className="space-y-2 mb-6">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Быстрые ответы на вопросы</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Помощь с техническими проблемами</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Информация о курсах и расписании</span>
        </li>
      </ul>

      <Link
        href="https://t.me/lingw_support"
        className="inline-block w-full px-4 py-2 bg-white text-primary text-center rounded-md font-medium hover:bg-gray-100"
      >
        Написать в Telegram
      </Link>
    </div>
  )
}

