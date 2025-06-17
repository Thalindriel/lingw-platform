import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: course } = await supabase.from("courses").select("*").eq("slug", params.slug).single()

  if (!course) return notFound()

  const knownSlugs = ["beginner", "conversation", "business", "exams"]
  if (!knownSlugs.includes(params.slug)) {
    return (
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Информация о курсе</h1>
        <p>Страница для данного курса ещё не создана.</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6 text-gray-700">{course.description}</p>
      <p className="text-xl font-semibold">{course.price}₽ / месяц</p>
    </main>
  )
}
