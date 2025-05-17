import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminRequests from "@/components/admin/requests"
import { createClient } from "@/lib/supabase/client"

export default function AdminPage() {
  const supabase = createClient()
  const [courses, setCourses] = useState([])
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [newCourse, setNewCourse] = useState({ title: "", description: "", price: 0 })

  const fetchCourses = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("courses").select("*")
    if (error) {
      console.error("Ошибка при загрузке курсов:", error)
    } else {
      setCourses(data)
    }
    setLoading(false)
  }

  const handleAddCourse = async () => {
    const { title, description, price } = newCourse
    if (!title || !description || !price) return alert("Пожалуйста, заполните все поля")

    const { error } = await supabase.from("courses").insert([{ title, description, price }])
    if (error) {
      console.error("Ошибка при добавлении курса:", error)
    } else {
      setNewCourse({ title: "", description: "", price: 0 })
      fetchCourses()
    }
  }

  const fetchLessons = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("lessons").select("*")
    if (error) {
      console.error("Ошибка при загрузке уроков:", error)
    } else {
      setLessons(data)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white p-4">Административная панель</header>

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

          <Tabs defaultValue="users">
            <TabsList className="mb-8">
              <TabsTrigger value="users">Пользователи</TabsTrigger>
              <TabsTrigger value="courses">Курсы</TabsTrigger>
              <TabsTrigger value="lessons">Уроки</TabsTrigger>
              <TabsTrigger value="requests">Заявки</TabsTrigger>
            </TabsList>

            {/* Таблица с курсами */}
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Управление курсами</CardTitle>
                    <Button className="bg-primary hover:bg-primary/90" onClick={fetchCourses}>Загрузить курсы</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      placeholder="Название курса"
                      className="max-w-sm"
                    />
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleAddCourse}>Добавить курс</Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Описание</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.id}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.description}</TableCell>
                          <TableCell>{course.price}₽</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">Редактировать</Button>
                            <Button variant="destructive" size="sm">Удалить</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Таблица с уроками */}
            <TabsContent value="lessons">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Управление уроками</CardTitle>
                    <Button className="bg-primary hover:bg-primary/90" onClick={fetchLessons}>Загрузить уроки</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Курс</TableHead>
                        <TableHead>Длительность</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lessons.map((lesson) => (
                        <TableRow key={lesson.id}>
                          <TableCell>{lesson.id}</TableCell>
                          <TableCell>{lesson.title}</TableCell>
                          <TableCell>{lesson.course_id}</TableCell>
                          <TableCell>{lesson.duration}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">Редактировать</Button>
                            <Button variant="destructive" size="sm">Удалить</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Заявки */}
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Заявки на курсы</CardTitle>
                </CardHeader>
                <CardContent>
                  <AdminRequests />
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
