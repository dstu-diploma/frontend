'use client'

import { Suspense } from 'react'
import { Toaster } from '@/shared/ui/shadcn/toast/toaster'
import { Header } from '@/widgets/Header/ui/Header'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import styles from './layout.module.scss'
import MediaQuery from 'react-responsive'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

export function AppContent({ children }: { children: React.ReactNode }) {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const layoutStyles = clsx(styles.layout, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Suspense fallback={<LayoutFallback />}>
      <div className={layoutStyles}>
        <Header />
        <div className={styles.container}>
          <MediaQuery minWidth={1024}>
            <Sidebar />
          </MediaQuery>
          <main className={styles.main}>{children}</main>
          <Toaster />
        </div>
      </div>
    </Suspense>
  )
}
