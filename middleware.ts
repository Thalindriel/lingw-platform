// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   try {
//     const supabase = createMiddlewareClient<Database>({ req, res })
//     const {
//       data: { session },
//     } = await supabase.auth.getSession()
//     const path = req.nextUrl.pathname
//     const protectedPaths = ["/dashboard", "/profile", "/lessons", "/schedule", "/progress", "/interactive-lessons", "/admin"]
//     const isProtected = protectedPaths.some((protectedPath) => path.startsWith(protectedPath))
//     if (!session && isProtected) {
//       return NextResponse.redirect(new URL("/login", req.url))
//     }
//     return res
//   } catch (e) {
//     console.error("Middleware failed:", e)
//     return new Response("Internal Middleware Error", { status: 500 })
//   }
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/profile/:path*",
//     "/lessons/:path*",
//     "/schedule/:path*",
//     "/progress/:path*",
//     "/interactive-lessons/:path*",
//     "/admin/:path*"
//   ],
// }
