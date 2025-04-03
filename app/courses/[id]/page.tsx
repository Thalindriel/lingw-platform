import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseDetails } from "@/components/courses/course-details"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const supabase = createClient()

  const { data: course } = await supabase.from("courses").select("*").eq("id", params.id).single()

  if (!course) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <CourseDetails course={course} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

