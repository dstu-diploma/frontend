import { createContext, useContext, useState, ReactNode } from 'react'
import { useInitAvatar } from '../hooks/profile/useInitAvatar'

interface AvatarContextType {
  avatarSrc: string | null
  setAvatarSrc: (src: string | null) => void
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)

  useInitAvatar(setAvatarSrc)

  return (
    <AvatarContext.Provider value={{ avatarSrc, setAvatarSrc }}>
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
