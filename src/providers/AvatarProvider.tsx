'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react'

interface AvatarContextType {
  avatarSrc: string | null
  setAvatarSrc: (src: string | null) => void
  isAvatarDeleted: boolean
  setAvatarDeleted: Dispatch<SetStateAction<boolean>>
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const [isAvatarDeleted, setAvatarDeleted] = useState<boolean>(false)

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
