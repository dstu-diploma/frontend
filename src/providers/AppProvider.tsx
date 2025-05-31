'use client'

import { QueryProvider } from '@/providers/QueryProvider'
import { UsernameProvider } from '@/providers/UsernameProvider'
import { AvatarProvider } from '@/providers/AvatarProvider'
import { NotificationProvider } from '@/providers/NotificationProvider'
import { ScreenSizeProvider } from './ScreenSizeProvider'
import { UploadsProvider } from '@/features/user/providers/UploadsProvider'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <NotificationProvider>
        <ScreenSizeProvider>
          <UsernameProvider>
            <AvatarProvider>
              <UploadsProvider>{children}</UploadsProvider>
            </AvatarProvider>
          </UsernameProvider>
        </ScreenSizeProvider>
      </NotificationProvider>
    </QueryProvider>
  )
}
