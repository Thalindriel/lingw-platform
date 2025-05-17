import { createMiddlewareClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/types/supabase"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient<Database>({ req, res })

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error("[Middleware Error] Ошибка получения сессии:", error)
      return NextResponse.redirect(new URL("/login", req.url))
    }

    const path = req.nextUrl.pathname

    const protectedPaths = [
      "/dashboard",
      "/profile",
      "/lessons",
      "/schedule",
      "/progress",
      "/interactive-lessons",
      "/admin",
    ]

    const isProtected = protectedPaths.some((p) => path.startsWith(p))

    if (!session?.user && isProtected) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return res
  } catch (e: any) {
    console.error("[Middleware Error]", e)
    return res
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/lessons/:path*",
    "/schedule/:path*",
    "/progress/:path*",
    "/interactive-lessons/:path*",
    "/admin/:path*",
  ],
}
