import { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/shared/styles/globals.scss'
import { AppProvider } from '@/providers/AppProvider'
import { AppContent } from './AppContent'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Packathon',
  description: 'Платформа для проведения хакатонов',
  icons: {
    icon: '/favicon.png',
  },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body suppressHydrationWarning={true} className={roboto.className}>
        <AppProvider>
          <AppContent>{children}</AppContent>
        </AppProvider>
      </body>
    </html>
  )
}
