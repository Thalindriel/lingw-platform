import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminRequests } from "@/components/admin/requests"


export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userName="Администратор" />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

          <Tabs defaultValue="users">
            <TabsList className="mb-8">
              <TabsTrigger value="users">Пользователи</TabsTrigger>
              <TabsTrigger value="courses">Курсы</TabsTrigger>
              <TabsTrigger value="lessons">Уроки</TabsTrigger>
              <TabsTrigger value="schedules">Расписание</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Управление пользователями</CardTitle>
                    <Button className="bg-primary hover:bg-primary/90">Добавить пользователя</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input placeholder="Поиск пользователей..." className="max-w-sm" />
                    <div className="flex gap-2">
                      <Button variant="outline">Экспорт</Button>
                      <Button variant="outline">Фильтры</Button>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Уровень</TableHead>
                        <TableHead>Дата регистрации</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">001</TableCell>
                        <TableCell>Дмитрий Корюков</TableCell>
                        <TableCell>dmitry@example.com</TableCell>
                        <TableCell>B1 Intermediate</TableCell>
                        <TableCell>15.03.2023</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">002</TableCell>
                        <TableCell>Анна Смирнова</TableCell>
                        <TableCell>anna@example.com</TableCell>
                        <TableCell>A2 Elementary</TableCell>
                        <TableCell>20.04.2023</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">003</TableCell>
                        <TableCell>Иван Петров</TableCell>
                        <TableCell>ivan@example.com</TableCell>
                        <TableCell>C1 Advanced</TableCell>
                        <TableCell>05.05.2023</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Управление курсами</CardTitle>
                    <Button className="bg-primary hover:bg-primary/90">Добавить курс</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input placeholder="Поиск курсов..." className="max-w-sm" />
                    <div className="flex gap-2">
                      <Button variant="outline">Экспорт</Button>
                      <Button variant="outline">Фильтры</Button>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Описание</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Кол-во уроков</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">001</TableCell>
                        <TableCell>Английский с нуля</TableCell>
                        <TableCell>Фундамент языка для тех, кто только начал изучать английский язык</TableCell>
                        <TableCell>11000₽</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">002</TableCell>
                        <TableCell>Разговорный английский</TableCell>
                        <TableCell>Фокус на практическом использовании языка в повседневных ситуациях</TableCell>
                        <TableCell>12500₽</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">003</TableCell>
                        <TableCell>Деловой английский</TableCell>
                        <TableCell>
                          Курс, ориентированный на изучение английского языка в профессиональной среде
                        </TableCell>
                        <TableCell>14000₽</TableCell>
                        <TableCell>40</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lessons">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Управление уроками</CardTitle>
                    <Button className="bg-primary hover:bg-primary/90">Добавить урок</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input placeholder="Поиск уроков..." className="max-w-sm" />
                    <div className="flex gap-2">
                      <Button variant="outline">Экспорт</Button>
                      <Button variant="outline">Фильтры</Button>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Курс</TableHead>
                        <TableHead>Длительность</TableHead>
                        <TableHead>Дата создания</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">001</TableCell>
                        <TableCell>Email Negotiations</TableCell>
                        <TableCell>Business English</TableCell>
                        <TableCell>45 минут</TableCell>
                        <TableCell>10.03.2023</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">002</TableCell>
                        <TableCell>Third Conditional</TableCell>
                        <TableCell>Grammar Advanced</TableCell>
                        <TableCell>30 минут</TableCell>
                        <TableCell>15.03.2023</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">003</TableCell>
                        <TableCell>Public Speaking</TableCell>
                        <TableCell>Speaking Club</TableCell>
                        <TableCell>60 минут</TableCell>
                        <TableCell>20.03.2023</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedules">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Управление расписанием</CardTitle>
                    <Button className="bg-primary hover:bg-primary/90">Добавить занятие</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input placeholder="Поиск занятий..." className="max-w-sm" />
                    <div className="flex gap-2">
                      <Button variant="outline">Экспорт</Button>
                      <Button variant="outline">Фильтры</Button>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Урок</TableHead>
                        <TableHead>Преподаватель</TableHead>
                        <TableHead>Студент</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">001</TableCell>
                        <TableCell>Email Negotiations</TableCell>
                        <TableCell>Анна Смирнова</TableCell>
                        <TableCell>Дмитрий Корюков</TableCell>
                        <TableCell>28.03.2023</TableCell>
                        <TableCell>10:00</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">002</TableCell>
                        <TableCell>Third Conditional</TableCell>
                        <TableCell>Иван Петров</TableCell>
                        <TableCell>Дмитрий Корюков</TableCell>
                        <TableCell>28.03.2023</TableCell>
                        <TableCell>15:30</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">003</TableCell>
                        <TableCell>Public Speaking</TableCell>
                        <TableCell>John Smith</TableCell>
                        <TableCell>Дмитрий Корюков</TableCell>
                        <TableCell>30.03.2023</TableCell>
                        <TableCell>11:00</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Редактировать
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

