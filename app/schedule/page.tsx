import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SchedulePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userName="Дмитрий Корюков" />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Календарь занятий</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <span className="mr-2">📅</span>
                Календарь
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <span className="mr-2">➕</span>
                Добавить
              </Button>
            </div>
          </div>

          <p className="text-gray-600 mb-8">Ближайшие занятия и дедлайны</p>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center text-blue-500 mb-2">
                <span className="text-xl font-bold mr-2">15</span>
                <div>
                  <p className="font-medium">Пятница</p>
                  <p className="text-sm">28 Марта</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold">10:00</p>
                    <h3 className="text-lg font-bold">Business English</h3>
                    <p className="text-gray-600">Email Negotiations</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    Урок
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span>👤</span>
                    <span className="text-sm">Анна Смирнова</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🖥️</span>
                    <span className="text-sm">Zoom Room 1</span>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90">Присоединиться</Button>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold">15:30</p>
                    <h3 className="text-lg font-bold">Grammar Advanced</h3>
                    <p className="text-gray-600">Third Conditional</p>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-500">
                    Дедлайн
                  </Badge>
                </div>

                <p className="text-gray-600 mb-4">Тест по условным предложениям</p>

                <Button variant="destructive">Сдать работу</Button>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center text-blue-500 mb-2">
                <span className="text-xl font-bold mr-2">16</span>
                <div>
                  <p className="font-medium">Суббота</p>
                  <p className="text-sm">30 Марта</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold">11:00</p>
                    <h3 className="text-lg font-bold">Speaking Club</h3>
                    <p className="text-gray-600">Public Speaking</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    Урок
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span>👤</span>
                    <span className="text-sm">John Smith</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🖥️</span>
                    <span className="text-sm">Zoom Room 3</span>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90">Присоединиться</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

