import { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/shared/styles/globals.scss'
import { AppProvider } from '@/providers/AppProvider'
import { AuthContent } from './AuthContent'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Packathon - Авторизация',
  description: 'Платформа для проведения хакатонов',
  icons: {
    icon: '/favicon.png',
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body suppressHydrationWarning={true} className={roboto.className}>
        <AppProvider>
          <AuthContent>{children}</AuthContent>
        </AppProvider>
      </body>
    </html>
  )
}
