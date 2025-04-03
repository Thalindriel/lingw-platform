import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ProgressPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userName="Дмитрий Корюков" />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Прогресс по курсам</h1>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Business English</h3>
                  <p className="text-gray-600">Пройдено 24 из 40 уроков</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Grammar Advanced</h3>
                  <p className="text-gray-600">Пройдено 11 из 30 уроков</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Speaking Club</h3>
                  <p className="text-gray-600">Пройдено 17 из 20 уроков</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90">Все курсы</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

