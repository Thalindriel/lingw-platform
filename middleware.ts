import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/types/supabase"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check auth condition
  const authPaths = ["/login", "/register", "/forgot-password"]
  const protectedPaths = ["/dashboard", "/profile", "/lessons", "/schedule", "/progress", "/interactive-lessons"]
  const adminPaths = ["/admin"]

  const path = req.nextUrl.pathname

  // Redirect if logged in and trying to access auth pages
  if (session && authPaths.some((authPath) => path.startsWith(authPath))) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Redirect if not logged in and trying to access protected pages
  if (!session && protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Check for admin role
  if (session && adminPaths.some((adminPath) => path.startsWith(adminPath))) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("user_id", session.user.id)
      .single()

    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/dashboard/:path*",
    "/profile/:path*",
    "/lessons/:path*",
    "/schedule/:path*",
    "/progress/:path*",
    "/interactive-lessons/:path*",
    "/admin/:path*",
  ],
}

