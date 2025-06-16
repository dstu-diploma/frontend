'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { UserPartial } from '@/features/user/model/types'

interface UserContextType {
  user: UserPartial | null
  setUser: (user: UserPartial | null) => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export const useUser = () => useContext(UserContext)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserPartial | null>(null)

  useEffect(() => {
    const userFromCookies = cookiesApi.getUser()
    setUser(userFromCookies)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
} 