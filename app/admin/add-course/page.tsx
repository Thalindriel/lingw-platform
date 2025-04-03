import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AddCoursePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userName="Администратор" />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Добавление нового курса</h1>
            <Button variant="outline">Назад к списку</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Информация о курсе</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Название курса</Label>
                    <Input id="title" placeholder="Введите название курса" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Цена (₽ в месяц)</Label>
                    <Input id="price" type="number" placeholder="Введите стоимость курса" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание курса</Label>
                  <Textarea id="description" placeholder="Введите описание курса" rows={5} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="color">Цвет курса</Label>
                    <Input id="color" type="color" className="h-10" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lessons">Количество уроков</Label>
                    <Input id="lessons" type="number" placeholder="Введите количество уроков" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Уровень сложности</Label>
                    <select id="level" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Выберите уровень</option>
                      <option value="A1">A1 Beginner</option>
                      <option value="A2">A2 Elementary</option>
                      <option value="B1">B1 Intermediate</option>
                      <option value="B2">B2 Upper Intermediate</option>
                      <option value="C1">C1 Advanced</option>
                      <option value="C2">C2 Proficiency</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline">Отмена</Button>
                  <Button className="bg-primary hover:bg-primary/90">Сохранить курс</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

