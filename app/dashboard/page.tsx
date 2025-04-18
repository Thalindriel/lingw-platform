import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCourses } from "@/components/dashboard/dashboard-courses"
import { DashboardSchedule } from "@/components/dashboard/dashboard-schedule"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("user_id", session.user.id).single()

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userName={profile?.full_name || "Пользователь"} />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Добро пожаловать, {profile?.full_name || "Пользователь"}!</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <DashboardStats userId={session.user.id} />
              <DashboardCourses userId={session.user.id} />
            </div>

            <div className="space-y-8">
              <DashboardSchedule userId={session.user.id} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
