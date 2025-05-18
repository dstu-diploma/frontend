import { Suspense } from 'react'
import { Metadata } from 'next'
import { QueryProvider } from '@/providers/QueryProvider'
import { Roboto } from 'next/font/google'
import { Toaster } from '@/shared/ui/shadcn/toast/toaster'
import LayoutFallback from '@/shared/ui/custom/LayoutFallback/LayoutFallback'
import styles from './layout.module.scss'
import '@/shared/styles/globals.scss'

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

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru' className={roboto.className}>
      <body>
        <QueryProvider>
          <Suspense fallback={<LayoutFallback />}>
            <div className={styles.layout}>
              <main className={styles.main}>{children}</main>
              <Toaster />
            </div>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  )
}
