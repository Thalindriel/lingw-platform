"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminRequests from "@/components/admin/requests";
import AdminSupportRequests from "@/components/admin/support-requests";
import AddCourseForm from "@/components/admin/add-course-form"


export default function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    // Можно реализовать загрузку курсов
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

          <Tabs defaultValue="courses">
            <TabsList className="mb-8">
              <TabsTrigger value="courses">Курсы</TabsTrigger>
              <TabsTrigger value="lessons">Уроки</TabsTrigger>
              <TabsTrigger value="requests">Заявки</TabsTrigger>
              <TabsTrigger value="support">Обращения</TabsTrigger>
            </TabsList>

            {/* Курсы */}
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle className="mb-4">Управление курсами</CardTitle>
                  <AddCourseForm onCourseAdded={fetchCourses} />
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
                          <TableCell className="space-x-2">
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

            {/* Уроки */}
            <TabsContent value="lessons">
              <Card>
                <CardHeader>
                  <CardTitle>Уроки</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Раздел находится в разработке.</p>
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

            {/* Обращения */}
            <TabsContent value="support">
              <AdminSupportRequests />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
