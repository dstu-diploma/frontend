'use client'

import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import React from 'react'
import styles from './HackathonPage.module.scss'
import HackathonCreateModal from '../HackathonCreateModal/HackathonCreateModal'
import HackathonList from './HackathonList'

interface HackathonPageContentProps {
  canManageHackathons: boolean
}

const HackathonPageContent = ({
  canManageHackathons,
}: HackathonPageContentProps) => {
  // Мобильные стили
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const hackathonPageStyles = clsx(styles.hackathonsContainer, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={hackathonPageStyles}>
      <h1 className={styles.hackathonsTitle}>Хакатоны</h1>
      <div className={styles.hackathonsContent}>
        {canManageHackathons && <HackathonCreateModal />}
        <HackathonList />
      </div>
    </div>
  )
}

export default HackathonPageContent
