import { createMiddlewareClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/types/supabase"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  let session = null

  try {
    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession()

    session = currentSession
  } catch (error) {
    console.error("Ошибка при получении сессии в middleware:", error)
    return res
  }

  const path = req.nextUrl.pathname

  const protectedPaths = [
    "/dashboard",
    "/profile",
    "/lessons",
    "/schedule",
    "/progress",
    "/interactive-lessons",
    "/admin"
  ]

  const isProtected = protectedPaths.some((protectedPath) =>
    path.startsWith(protectedPath)
  )

  if (!session && isProtected) {
    console.log("Пользователь не авторизован, редирект на /login")
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/lessons/:path*",
    "/schedule/:path*",
    "/progress/:path*",
    "/interactive-lessons/:path*",
    "/admin/:path*"
  ],
}
