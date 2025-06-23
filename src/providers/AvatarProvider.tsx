'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react'
import { cookiesApi } from '@/shared/lib/helpers/cookies'

interface AvatarContextType {
  avatarSrc: string | null
  setAvatarSrc: (src: string | null) => void
  isAvatarDeleted: boolean
  setAvatarDeleted: Dispatch<SetStateAction<boolean>>
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

export function AvatarProvider({ children }: { children: ReactNode }) {
  // Инициализация из cookies
  const getInitialAvatar = () => {
    const user = cookiesApi.getUser()
    return user?.uploads?.find((u: any) => u.type === 'avatar')?.url || null
  }
  const [avatarSrc, setAvatarSrc] = useState<string | null>(getInitialAvatar())
  const [isAvatarDeleted, setAvatarDeleted] = useState<boolean>(false)

  // Синхронизация с cookies при изменении cookies (например, после смены аватарки)
  useEffect(() => {
    const interval = setInterval(() => {
      const user = cookiesApi.getUser()
      const url =
        user?.uploads?.find((u: any) => u.type === 'avatar')?.url || null
      setAvatarSrc(prev => {
        if (prev !== url) {
          // Лог для отладки
          console.log('[AvatarProvider] avatarSrc обновлён из cookies:', url)
          return url
        }
        return prev
      })
    }, 2000) // Проверять раз в 2 секунды
    return () => clearInterval(interval)
  }, [])

  return (
    <AvatarContext.Provider
      value={{ avatarSrc, setAvatarSrc, isAvatarDeleted, setAvatarDeleted }}
    >
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatar() {
  const context = useContext(AvatarContext)
  if (context === undefined) {
    throw new Error('useAvatar must be used within an AvatarProvider')
  }
  return context
}
