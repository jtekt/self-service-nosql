import { type NextRequest, NextResponse } from "next/server"

import { getUserNameFromSession } from "./lib/sessions"

// Middleware used for authentication
export async function middleware(request: NextRequest) {
  const anonymousRoutes = ["/login", "/register"]
  if (anonymousRoutes.includes(request.nextUrl.pathname)) return

  const username = await getUserNameFromSession()
  if (!username)
    return NextResponse.redirect(new URL("/login", request.nextUrl))

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
