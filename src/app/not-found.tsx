'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Roboto } from 'next/font/google'
import styles from './not-found.module.scss'
import { Button } from '@/shared/ui/shadcn/button'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
})

export default function NotFound() {
  const router = useRouter()

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const notFoundContainerStyles = clsx(styles.container, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={`${notFoundContainerStyles} ${roboto.className}`}>
      <h1 className={styles.brandTitle}>Packathon</h1>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Страница не найдена</h2>
        <p className={styles.description}>
          Извините, но страница, которую вы ищете, не существует или была
          перемещена.
        </p>
        <div className={styles.actions}>
          <Button className={styles.button} onClick={() => router.back()}>
            Назад
          </Button>
          <Link href='/'>
            <Button className={styles.button}>На главную</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
