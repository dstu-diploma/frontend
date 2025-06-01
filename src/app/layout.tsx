import { ReactNode } from 'react'
import { QueryProvider } from '@/providers/QueryProvider'
import { NotificationProvider } from '@/providers/NotificationProvider'
import type { Metadata } from 'next'
import '@/shared/styles/globals.scss'
import { ScreenSizeProvider } from '@/providers/ScreenSizeProvider'
import { Roboto } from 'next/font/google'

export const metadata: Metadata = {
  title: '404 - Страница не найдена',
  description: 'Страница не найдена',
}

interface RootLayoutProps {
  children: ReactNode
}

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ru'>
      <body className={`${roboto.className}`}>
        <QueryProvider>
          <ScreenSizeProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </ScreenSizeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
