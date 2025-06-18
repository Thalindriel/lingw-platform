"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CourseList } from "@/components/courses/course-list"
import AdminRequests from "@/components/admin/requests"
import AdminSupportRequests from "@/components/admin/support-requests"

export default function AdminPage() {
  const [tab, setTab] = useState("courses")

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

          <Tabs defaultValue={tab} onValueChange={setTab}>
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
                  <CardTitle>Редактирование курсов</CardTitle>
                </CardHeader>
                <CardContent>
                  <CourseList editable />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Уроки */}
            <TabsContent value="lessons">
              <Card>
                <CardHeader>
                  <CardTitle>Редактирование уроков (в разработке)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Здесь будет управление уроками.</p>
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

            {/* Обращения в поддержку */}
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
