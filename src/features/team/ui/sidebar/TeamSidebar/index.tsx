import { memo } from 'react'
import { TeamInfo } from '../../../model/types'
import clsx from 'clsx'
import styles from './TeamSidebar.module.scss'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface TeamSidebarProps {
  team: TeamInfo
  teamName: string | undefined
}

export const TeamSidebar = memo(({ team, teamName }: TeamSidebarProps) => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const sidebarStyles = clsx(styles.sidebar, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  // Чтобы название не влезало на текст опции
  const cropTeamName = (teamName: string | undefined) => {
    if (!teamName) return
    return teamName.length > 15 ? `${teamName.slice(0, 20)}...` : teamName
  }

  return (
    <aside className={sidebarStyles}>
      <div className={styles.sidebarBlock}>
        <h4>Информация о команде</h4>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <span className={styles.param}>ID команды</span>
            <span className={styles.value}>{team?.id}</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Название</span>
            <span className={styles.value}>
              {cropTeamName(teamName) || 'Название не получено'}
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Запись на хакатоне</span>
            <span className={styles.value}>Нет</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Участников</span>
            <span className={styles.value}>{team?.mates.length}</span>
          </li>
        </ul>
      </div>
    </aside>
  )
})

TeamSidebar.displayName = 'TeamSidebar'
