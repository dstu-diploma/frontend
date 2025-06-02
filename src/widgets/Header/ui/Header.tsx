'use client'

import Link from 'next/link'
import { Username, useUsername } from '@/providers/UsernameProvider'
import UserAvatar from './UserAvatar/UserAvatar'
import styles from './Header.module.scss'
import { useState, useEffect } from 'react'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import { RxHamburgerMenu } from 'react-icons/rx'
import MobileSidebar from '@/widgets/Sidebar/ui/MobileSidebar'
import MediaQuery from 'react-responsive'

export const Header = () => {
  const { username: contextUsername } = useUsername()
  const [username, setUsername] = useState<Username | null>(null)

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const headerStyles = clsx(styles.header, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  useEffect(() => {
    setUsername(contextUsername)
  }, [contextUsername])

  return (
    <header className={headerStyles}>
      <div className={styles.headerContent}>
        <div className={styles.logoBlock}>
          <MediaQuery maxWidth={1023}>
            <MobileSidebar>
              <RxHamburgerMenu className={styles.burgerIcon} />
            </MobileSidebar>
          </MediaQuery>
          <Link href='/' className={styles.brand}>
            <h1 className={styles.brandTitle}>Packathon</h1>
          </Link>
        </div>
        <div className={styles.userInfo}>
          <Link href='/profile' className={styles.userName}>
            <span>
              {username?.first_name &&
                username?.last_name &&
                `${username.first_name} ${username.last_name}`}
            </span>
          </Link>
          <div className={styles.avatarWrapper}>
            <UserAvatar username={username} />
          </div>
        </div>
      </div>
    </header>
  )
}
