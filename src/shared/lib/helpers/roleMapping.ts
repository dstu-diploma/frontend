import { cookiesApi } from './cookies'
import { useUser } from '@/providers/UserProvider'

const user = cookiesApi.getUser()

export const roleMap: Record<string, string> = {
  user: 'Участник',
  admin: 'Администратор',
  organizer: 'Организатор',
  helper: 'Тех.поддержка',
  judge: 'Член жюри',
} as const

export type RoleMapValues = (typeof roleMap)[keyof typeof roleMap]

export const mapRole = (roleKey: string): string => {
  return roleKey in roleMap ? roleMap[roleKey] : roleKey
}

export const mapRoleKey = (role: string): string => {
  return Object.keys(roleMap).find(key => roleMap[key] === role) || role
}

export const isAdmin = (): boolean => {
  return user.role === 'admin'
}

export const isAdminOrOrganizer = (): boolean | null => {
  const { user: currentUser } = useUser()
  return currentUser && (currentUser.role === 'admin' || currentUser.role === 'organizer')
}

export const isPrivilegedRole = (): boolean => {
  return (
    user.role === 'admin' || user.role === 'organizer' || user.role === 'judge'
  )
}
