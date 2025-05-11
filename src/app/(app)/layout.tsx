'use client'

import { Suspense, useEffect } from 'react'
import { Roboto } from 'next/font/google'
import { Toaster } from '@/shared/ui/shadcn/toast/toaster'
import { QueryProvider } from '@/providers/QueryProvider'
import { UsernameProvider } from '@/providers/UsernameContext'
import { AvatarProvider } from '@/features/user/context/AvatarContext'
import { Header } from '@/widgets/Header/ui/Header'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar'
import LayoutFallback from '@/shared/ui/custom/LayoutFallback/LayoutFallback'
import styles from './layout.module.scss'
import '@/shared/styles/globals.scss'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
})

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.removeAttribute('cz-shortcut-listen')
    }
  }, [])

  return (
    <html>
      <body suppressHydrationWarning={true}>
        <QueryProvider>
          <UsernameProvider>
            <AvatarProvider>
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
            </AvatarProvider>
          </UsernameProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
