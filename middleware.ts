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

  const path = req.nextUrl.pathname

  const publicPaths = new Set(["/", "/login", "/register"])
  const protectedPaths = ["/dashboard", "/profile", "/lessons", "/schedule", "/progress", "/interactive-lessons"]
  const adminPaths = ["/admin"]

  if (session && (path === "/login" || path === "/register")) {
    console.log("User is already authenticated, redirecting from login/register to dashboard")
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  if (!session && protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
    console.log("User is not authenticated, redirecting to login")
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (session && adminPaths.some((adminPath) => path.startsWith(adminPath))) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("user_id", session.user.id)
      .single()

    if (!profile || profile.role !== "admin") {
      console.log("User is not an admin, redirecting to dashboard")
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/lessons/:path*",
    "/schedule/:path*",
    "/progress/:path*",
    "/interactive-lessons/:path*",
    "/admin/:path*",
  ],
}
