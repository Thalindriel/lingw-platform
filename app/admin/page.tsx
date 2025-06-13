"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminRequests from "@/components/admin/requests";
import { Footer } from "@/components/footer";

export default function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

return (
  <div className="flex flex-col min-h-screen">
    <Header /> {/* хедер */}
    
    <main className="flex-1">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

        <Tabs defaultValue="users">
          <TabsList className="mb-8">
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="lessons">Уроки</TabsTrigger>
            <TabsTrigger value="requests">Заявки</TabsTrigger>
          </TabsList>

          {/* Таб: Курсы */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Управление курсами</CardTitle>
                  <Button className="bg-primary hover:bg-primary/90">Добавить курс</Button>
                </div>
              </CardHeader>
              <CardContent>
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

          {/* Таб: Заявки */}
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
);
}
