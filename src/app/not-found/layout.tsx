import { ReactNode } from 'react'
import { QueryProvider } from '@/providers/QueryProvider'
import { NotificationProvider } from '@/providers/NotificationProvider'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ru'>
      <body>
        <QueryProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
