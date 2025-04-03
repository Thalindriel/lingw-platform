"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase/client"
import { Icons } from "@/components/ui/icons"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Course {
  id: string
  title: string
  description: string
  price: number
  color: string
}

interface CourseDetailsProps {
  course: Course
}

export function CourseDetails({ course }: CourseDetailsProps) {
  const router = useRouter()
  const [enrolling, setEnrolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleEnroll = async () => {
    setEnrolling(true)
    setError(null)
    setSuccess(null)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from("user_courses")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("course_id", course.id)
        .single()

      if (existingEnrollment) {
        setSuccess("Вы уже записаны на этот курс!")
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
        return
      }

      // Get total lessons count
      const { data: lessonsCount } = await supabase
        .from("lessons")
        .select("id", { count: "exact" })
        .eq("course_id", course.id)

      const totalLessons = lessonsCount?.length || 0

      // Enroll user
      const { error: enrollError } = await supabase.from("user_courses").insert({
        user_id: session.user.id,
        course_id: course.id,
        progress: 0,
        lessons_completed: 0,
        total_lessons: totalLessons,
      })

      if (enrollError) throw enrollError

      setSuccess("Вы успешно записаны на курс!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error("Error enrolling in course:", error.message)
      setError("Не удалось записаться на курс. Пожалуйста, попробуйте позже.")
    } finally {
      setEnrolling(false)
    }
  }

  return (
    <div>
      <div className="rounded-lg p-8 mb-8 text-white" style={{ backgroundColor: course.color || "#4aacbd" }}>
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-xl mb-6">{course.description}</p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-2xl font-bold">{course.price}₽ в месяц</p>
            <p className="text-sm opacity-80">Оплата помесячно, без скрытых платежей</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200 mb-4">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <Button className="bg-white text-blue-600 hover:bg-white/90" onClick={handleEnroll} disabled={enrolling}>
            {enrolling ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Записываемся...
              </>
            ) : (
              "Записаться на курс"
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="about">
        <TabsList className="mb-8">
          <TabsTrigger value="about">О курсе</TabsTrigger>
          <TabsTrigger value="program">Программа</TabsTrigger>
          <TabsTrigger value="teachers">Преподаватели</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Для кого этот курс</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Для тех, кто хочет улучшить свои навыки английского языка</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Для тех, кто ценит индивидуальный подход и гибкий график</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Для тех, кто готов регулярно заниматься и выполнять домашние задания</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Что вы получите</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Индивидуальные занятия с преподавателем</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Доступ к интерактивным материалам и упражнениям</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Регулярную обратную связь и оценку прогресса</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Сертификат по окончании курса</span>
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="program" className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Программа курса</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-bold">Модуль 1: Основы</h3>
                <p className="text-gray-600">Введение в курс, базовые понятия и термины</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-bold">Модуль 2: Практика</h3>
                <p className="text-gray-600">Практические упражнения и задания</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-bold">Модуль 3: Продвинутые темы</h3>
                <p className="text-gray-600">Углубленное изучение сложных тем</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-bold">Модуль 4: Итоговый проект</h3>
                <p className="text-gray-600">Подготовка и защита итогового проекта</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Наши преподаватели</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold">Анна Смирнова</h3>
                  <p className="text-gray-600">Опыт преподавания: 5 лет</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Сертифицированный преподаватель английского языка с опытом работы в языковых школах и
                    индивидуального обучения.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold">Иван Петров</h3>
                  <p className="text-gray-600">Опыт преподавания: 7 лет</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Преподаватель с международными сертификатами и опытом работы с учениками разного уровня подготовки.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Отзывы студентов</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 font-bold">Мария К.</span>
                </div>
                <p className="text-gray-600">
                  Отличный курс! Преподаватели очень внимательные и всегда готовы помочь. Я значительно улучшила свой
                  уровень английского за короткое время.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.
034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 font-bold">Алексей С.</span>
                </div>
                <p className="text-gray-600">
                  Гибкий график и индивидуальный подход - именно то, что мне было нужно. Рекомендую всем, кто хочет
                  учить английский в своем темпе.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

