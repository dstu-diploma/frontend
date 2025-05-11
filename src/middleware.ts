import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const protectedRoutes = [
    '/profile',
    '/admin',
    '/hackathons',
    '/team',
    '/user',
    '/requests',
  ]
  const isAuthenticated = request.cookies.has('access_token')

  if (request.nextUrl.pathname === '/') {
    const response = NextResponse.redirect(new URL('/hackathons', request.url))
    return response
  }

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
    '/',
    '/profile/:path*',
    '/admin/:path*',
    '/team/:path*',
    '/user/:path*',
    '/requests/:path*',
  ],
}
