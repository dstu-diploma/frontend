import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const protectedRoutes = ['/profile', '/admin', '/team', '/user']
  const isAuthenticated = request.cookies.has('access_token')
  
  for (const route of protectedRoutes) {
    if (!isAuthenticated && request.nextUrl.pathname.startsWith(route)) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.set('login_redirect_reason', 'Необходима авторизация', {
        maxAge: 60,
        path: '/',
      })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/admin/:path*',
    '/team/:path*',
    '/user/:path*',
  ],
} 