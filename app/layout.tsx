import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SupabaseProvider } from "@/components/providers/supabase-provider"
import { Toaster } from "@/components/ui/toaster" 

const gilroy = localFont({
  src: [
    { path: "../public/assets/fonts/Gilroy-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/assets/fonts/Gilroy-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/assets/fonts/Gilroy-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/assets/fonts/Gilroy-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/assets/fonts/Gilroy-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/assets/fonts/Gilroy-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-gilroy",
})

export const metadata: Metadata = {
  title: "LingW - Изучайте английский язык онлайн",
  description: "Образовательная платформа для изучения английского языка с профессиональными преподавателями",
  icons: {
    icon: "/favicon.ico",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${gilroy.variable} font-gilroy`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <SupabaseProvider>
            {children}
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
