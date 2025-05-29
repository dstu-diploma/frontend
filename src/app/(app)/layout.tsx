import { Suspense } from 'react'
import { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Toaster } from '@/shared/ui/shadcn/toast/toaster'
import { Header } from '@/widgets/Header/ui/Header'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import styles from './layout.module.scss'
import '@/shared/styles/globals.scss'
import { AppProvider } from '@/providers/AppProvider'

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
      <body suppressHydrationWarning={true}>
        <AppProvider>
          <Suspense fallback={<LayoutFallback />}>
            <div className={`${styles.layout} ${roboto.className}`}>
              <Header />
              <div className={styles.container}>
                <Sidebar />
                <main className={styles.main}>{children}</main>
                <Toaster />
              </div>
            </div>
          </Suspense>
        </AppProvider>
      </body>
    </html>
  )
}
