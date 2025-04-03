import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LessonsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Быстрый доступ к урокам</h1>
            <div className="flex items-center">
              <span className="mr-2 text-sm">Сортировать по:</span>
              <Select defaultValue="latest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Последние</SelectItem>
                  <SelectItem value="progress">Прогресс</SelectItem>
                  <SelectItem value="name">Название</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">Business English</h2>
                    <Badge variant="outline" className="bg-blue-50">
                      45 минут
                    </Badge>
                  </div>
                  <h3 className="text-lg mb-4">Email Negotiations</h3>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Прогресс урока</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <div className="flex justify-end mt-1">
                      <span className="text-sm text-gray-500">80%</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium">Следующая тема</p>
                    <p className="text-gray-700">Business Proposals</p>
                    <p className="text-sm text-gray-500">Осталось: 2 дня</p>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">Продолжить</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">Grammar Advanced</h2>
                    <Badge variant="outline" className="bg-blue-50">
                      30 минут
                    </Badge>
                  </div>
                  <h3 className="text-lg mb-4">Third Conditional</h3>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Прогресс урока</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-end mt-1">
                      <span className="text-sm text-gray-500">65%</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium">Следующая тема</p>
                    <p className="text-gray-700">Mixed Conditionals</p>
                    <p className="text-sm text-gray-500">Осталось: 1 день</p>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">Продолжить</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">Speaking Club</h2>
                    <Badge variant="outline" className="bg-blue-50">
                      60 минут
                    </Badge>
                  </div>
                  <h3 className="text-lg mb-4">Public Speaking</h3>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Прогресс урока</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <div className="flex justify-end mt-1">
                      <span className="text-sm text-gray-500">90%</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium">Следующая тема</p>
                    <p className="text-gray-700">Handling Q&A</p>
                    <p className="text-sm text-gray-500">Осталось: 3 дня</p>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">Продолжить</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

