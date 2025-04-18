import { createMiddlewareClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/types/supabase"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname

  const publicPaths = ["/login", "/register", "/auth", "/favicon.ico"]
  const isPublic = publicPaths.some((publicPath) => path.startsWith(publicPath))

  if (isPublic) {
    return res
  }

  const protectedPaths = [
    "/dashboard",
    "/profile",
    "/lessons",
    "/schedule",
    "/progress",
    "/interactive-lessons",
    "/admin",
  ]

  const isProtected = protectedPaths.some((protectedPath) => path.startsWith(protectedPath))

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
