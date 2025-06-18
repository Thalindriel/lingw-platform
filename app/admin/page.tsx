"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import AdminRequests from "@/components/admin/requests"
import AdminSupportRequests from "@/components/admin/support-requests"

export default function AdminPage() {
  const supabase = createClient()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null)
  const [newPrice, setNewPrice] = useState<number>(0)

  const fetchCourses = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false })
    if (!error) setCourses(data)
    setLoading(false)
  }

  const handleEditCourse = (course: any) => {
    setEditingCourseId(course.id)
    setNewPrice(course.price)
  }

  const handleSavePrice = async (id: string) => {
    const { error } = await supabase.from("courses").update({ price: newPrice }).eq("id", id)
    if (!error) {
      await fetchCourses()
      setEditingCourseId(null)
    }
  }

  const handleDeleteCourse = async (id: string) => {
    const confirmDelete = confirm("Вы уверены, что хотите удалить курс?")
    if (!confirmDelete) return
    const { error } = await supabase.from("courses").delete().eq("id", id)
    if (!error) await fetchCourses()
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

          <Tabs defaultValue="courses">
            <TabsList className="mb-8">
              <TabsTrigger value="courses">Курсы</TabsTrigger>
              <TabsTrigger value="requests">Заявки</TabsTrigger>
              <TabsTrigger value="support">Обращения</TabsTrigger>
            </TabsList>

            {/* --- ТАБ Курсы --- */}
            <TabsContent value="courses">
              {/* Форма добавления */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Добавить новый курс</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const form = e.currentTarget
                      const title = form.title.value
                      const description = form.description.value
                      const price = parseInt(form.price.value)
                      const slug = form.slug.value
                      const color = form.color.value || "#4aacbd"

                      if (!title || !description || !price || !slug) {
                        alert("Заполните все поля")
                        return
                      }

                      const { error } = await supabase.from("courses").insert([
                        { title, description, price, slug, color },
                      ])

                      if (error) {
                        alert("Ошибка при добавлении курса")
                        console.error(error)
                      } else {
                        fetchCourses()
                        form.reset()
                      }
                    }}
                  >
                    <Input name="title" placeholder="Название курса" required />
                    <Input name="description" placeholder="Описание курса" required />
                    <Input name="price" type="number" placeholder="Цена (₽)" required />
                    <Input name="slug" placeholder="slug (например: beginner)" required />
                    <Input name="color" placeholder="Цвет (например: #4aacbd)" />
                    <div className="md:col-span-2">
                      <Button type="submit">Добавить курс</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Таблица курсов */}
              <Card>
                <CardHeader>
                  <CardTitle>Управление курсами</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p>Загрузка...</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Название</TableHead>
                          <TableHead>Описание</TableHead>
                          <TableHead>Цена</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.title}</TableCell>
                            <TableCell>{course.description}</TableCell>
                            <TableCell>
                              {editingCourseId === course.id ? (
                                <div className="flex gap-2">
                                  <Input
                                    type="number"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(Number(e.target.value))}
                                    className="w-24"
                                  />
                                  <Button size="sm" onClick={() => handleSavePrice(course.id)}>
                                    Сохранить
                                  </Button>
                                </div>
                              ) : (
                                `${course.price}₽`
                              )}
                            </TableCell>
                            <TableCell className="space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditCourse(course)}
                              >
                                Изменить цену
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                Удалить
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- ТАБ Заявки --- */}
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

            {/* --- ТАБ Обращения --- */}
            <TabsContent value="support">
              <AdminSupportRequests />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
