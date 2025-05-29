'use client'

import { QueryProvider } from '@/providers/QueryProvider'
import { UsernameProvider } from '@/providers/UsernameProvider'
import { AvatarProvider } from '@/providers/AvatarProvider'
import { NotificationProvider } from '@/providers/NotificationProvider'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <NotificationProvider>
        <UsernameProvider>
          <AvatarProvider>{children}</AvatarProvider>
        </UsernameProvider>
      </NotificationProvider>
    </QueryProvider>
  )
}
