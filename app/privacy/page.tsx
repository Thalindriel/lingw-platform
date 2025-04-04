export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Политика конфиденциальности</h1>
      <p className="mb-4">Эта страница содержит информацию о политике конфиденциальности LingW.</p>
      <p>Последнее обновление: {new Date().toLocaleDateString()}</p>
    </div>
  )
}

