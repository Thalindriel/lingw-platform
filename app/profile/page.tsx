import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserStats } from "@/components/profile/user-stats"
import { UserProfile } from "@/components/profile/user-profile"
import { LanguageLevel } from "@/components/profile/language-level"
import { UserCourses } from "@/components/profile/user-courses"

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <Tabs defaultValue="profile">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="courses">Мои курсы</TabsTrigger>
              <TabsTrigger value="schedule">Расписание</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <UserStats />
              <UserProfile />
              <div className="mt-8">
                <LanguageLevel />
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <UserCourses />
            </TabsContent>

            <TabsContent value="schedule">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Расписание занятий</h2>
                <p className="text-gray-500">Функциональность расписания будет доступна в ближайшее время.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

