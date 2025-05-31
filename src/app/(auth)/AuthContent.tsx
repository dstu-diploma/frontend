'use client'

import { Suspense } from 'react'
import { Toaster } from '@/shared/ui/shadcn/toast/toaster'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import styles from './layout.module.scss'
import { ScreenSizeProvider } from '@/providers/ScreenSizeProvider'

export function AuthContent({ children }: { children: React.ReactNode }) {
  return (
    <ScreenSizeProvider>
      <Suspense fallback={<LayoutFallback />}>
        <div className={styles.layout}>
          <main className={styles.main}>{children}</main>
          <Toaster />
        </div>
      </Suspense>
    </ScreenSizeProvider>
  )
}
