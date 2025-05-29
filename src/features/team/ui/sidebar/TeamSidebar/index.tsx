import { memo } from 'react'
import { TeamInfo } from '../../../model/types'
import styles from './TeamSidebar.module.scss'

interface TeamSidebarProps {
  team: TeamInfo
  teamName: string | undefined
}

export const TeamSidebar = memo(({ team, teamName }: TeamSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
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
              {teamName || 'Название не получено'}
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
