import Cookies from 'js-cookie'
import { FullUser, TokensObject } from '@/features/user/model/types'

const COOKIE_OPTIONS = {
  expires: 7,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
}

const validateUploads = (user: FullUser) => {
  if (!user.uploads) return user

  const validTypes = ['avatar', 'cover']
  const validatedUploads = user.uploads.filter(
    upload => upload && upload.type && validTypes.includes(upload.type),
  )

  const avatar = validatedUploads.find(upload => upload.type === 'avatar')
  const cover = validatedUploads.find(upload => upload.type === 'cover')

  return {
    ...user,
    uploads: [avatar, cover].filter(Boolean),
  }
}

export const cookiesApi = {
  setAccessToken: (accessToken: string) => {
    Cookies.set('access_token', accessToken, COOKIE_OPTIONS)
  },
  setRefreshToken: (refreshToken: string) => {
    Cookies.set('refresh_token', refreshToken, COOKIE_OPTIONS)
  },
  setUserCookie: (user: FullUser) => {
    const validatedUser = validateUploads(user)
    Cookies.set('user', JSON.stringify(validatedUser), COOKIE_OPTIONS)
  },
  setTokensCookie: (tokens: TokensObject) => {
    Cookies.set('access_token', tokens.accessToken)
    Cookies.set('refresh_token', tokens.refreshToken)
  },
  setAuthCookies: (
    user: FullUser,
    accessToken: string,
    refreshToken: string,
  ) => {
    const validatedUser = validateUploads(user)
    Cookies.set('user', JSON.stringify(validatedUser), COOKIE_OPTIONS)
    Cookies.set('access_token', accessToken, COOKIE_OPTIONS)
    Cookies.set('refresh_token', refreshToken, COOKIE_OPTIONS)
  },
  getAuthCookies: () => {
    const userCookie = Cookies.get('user')
    const user = userCookie ? JSON.parse(userCookie) : null

    return {
      user,
      accessToken: Cookies.get('access_token'),
      refreshToken: Cookies.get('refresh_token'),
    }
  },
  getAccessToken: () => {
    return Cookies.get('access_token')
  },
  getRefreshToken: () => {
    return Cookies.get('refresh_token')
  },
  removeAuthCookies: () => {
    Cookies.remove('user', { path: '/' })
    Cookies.remove('access_token', { path: '/' })
    Cookies.remove('refresh_token', { path: '/' })
  },
  isAuthenticated: () => {
    return !!Cookies.get('access_token')
  },
  getUser: () => {
    const userCookie = Cookies.get('user')
    return userCookie ? JSON.parse(userCookie) : null
  },
}
