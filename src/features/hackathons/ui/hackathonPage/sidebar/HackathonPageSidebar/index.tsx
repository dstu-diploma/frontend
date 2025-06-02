import React from 'react'
import styles from './HackathonPageSidebar.module.scss'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

interface HackathonPageSidebarProps {
  children: React.ReactNode
  actions?: React.ReactNode
  title: string
}

const HackathonPageSidebar = ({
  children,
  title,
  actions,
}: HackathonPageSidebarProps) => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const sidebarStyles = clsx(styles.sidebar, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={sidebarStyles}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarSection}>
          <h4>{title}</h4>
          {children}
        </div>
        {actions}
      </div>
    </div>
  )
}

export default HackathonPageSidebar
