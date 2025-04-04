export default function TermsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Условия использования</h1>
      <p className="mb-4">Эта страница содержит информацию об условиях использования платформы LingW.</p>
      <p>Последнее обновление: {new Date().toLocaleDateString()}</p>
    </div>
  )
}

