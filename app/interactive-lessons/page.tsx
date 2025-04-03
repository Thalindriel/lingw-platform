import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InteractiveLessonsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userName="Дмитрий Корюков" />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-4">Интерактивные уроки</h1>
          <p className="text-gray-600 mb-8">Практикуйте английский язык с помощью интерактивных упражнений и заданий</p>

          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">Все уроки</TabsTrigger>
              <TabsTrigger value="grammar">Грамматика</TabsTrigger>
              <TabsTrigger value="vocabulary">Лексика</TabsTrigger>
              <TabsTrigger value="listening">Аудирование</TabsTrigger>
              <TabsTrigger value="speaking">Говорение</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Условные предложения</h2>
                        <Badge>Грамматика</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Интерактивные упражнения на все типы условных предложений в английском языке
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-4xl">🔤</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Бизнес-лексика</h2>
                        <Badge>Лексика</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Изучение и закрепление бизнес-терминологии через интерактивные карточки и игры
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                      <span className="text-4xl">���</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Понимание на слух</h2>
                        <Badge>Аудирование</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Тренировка восприятия английской речи на слух с помощью аудиозаписей и заданий
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                      <span className="text-4xl">🗣️</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Разговорные фразы</h2>
                        <Badge>Говорение</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Практика разговорных фраз и выражений для повседневного общения
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Времена глаголов</h2>
                        <Badge>Грамматика</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">Интерактивные упражнения на все времена английского глагола</p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-cyan-400 to-cyan-600 flex items-center justify-center">
                      <span className="text-4xl">🌍</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Идиомы и фразеологизмы</h2>
                        <Badge>Лексика</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Изучение популярных английских идиом и фразеологизмов через интерактивные задания
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="grammar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Условные предложения</h2>
                        <Badge>Грамматика</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Интерактивные упражнения на все типы условных предложений в английском языке
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Времена глаголов</h2>
                        <Badge>Грамматика</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">Интерактивные упражнения на все времена английского глагола</p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="vocabulary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-4xl">🔤</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Бизнес-лексика</h2>
                        <Badge>Лексика</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Изучение и закрепление бизнес-терминологии через интерактивные карточки и игры
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-cyan-400 to-cyan-600 flex items-center justify-center">
                      <span className="text-4xl">🌍</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Идиомы и фразеологизмы</h2>
                        <Badge>Лексика</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Изучение популярных английских идиом и фразеологизмов через интерактивные задания
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="listening">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                      <span className="text-4xl">🎧</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Понимание на слух</h2>
                        <Badge>Аудирование</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Тренировка восприятия английской речи на слух с помощью аудиозаписей и заданий
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="speaking">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                      <span className="text-4xl">🗣️</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold">Разговорные фразы</h2>
                        <Badge>Говорение</Badge>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Практика разговорных фраз и выражений для повседневного общения
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">Начать урок</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

