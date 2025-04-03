import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseList } from "@/components/courses/course-list"

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Наши курсы</h1>
            <p className="text-xl max-w-2xl">
              Выберите подходящий курс и начните изучать английский язык с профессиональными преподавателями
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <CourseList />
        </div>
      </main>

      <Footer />
    </div>
  )
}

