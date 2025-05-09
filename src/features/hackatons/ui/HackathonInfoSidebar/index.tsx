import React from 'react'
import styles from './HackathonInfoSidebar.module.scss'
import { DetailedHackathon } from '../../model/types'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'

interface HackathonInfoSidebarProps {
  hackathon: DetailedHackathon | null
}

const HackathonInfoSidebar = ({ hackathon }: HackathonInfoSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBlock}>
        <h4>Информация о команде</h4>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <span className={styles.param}>Дата начала&nbsp;</span>
            <span className={styles.value}>
              {ISOStringToDateString(hackathon?.start_date) || 'Не указана'}
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Дата начала оценивания&nbsp;</span>
            <span className={styles.value}>
              {ISOStringToDateString(hackathon?.score_start_date) ||
                'Не указана'}
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Дата окончания&nbsp;</span>
            <span className={styles.value}>
              {ISOStringToDateString(hackathon?.end_date) || 'Не указана'}
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>
              Количество команд участников&nbsp;
            </span>
            <span className={styles.value}>
              {hackathon?.teams.length || 'Не указано'}
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>
              Максимальное количество участников&nbsp;
            </span>
            <span className={styles.value}>
              {hackathon?.max_participant_count || 'Не указано'}
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>
              Максимальный размер команды&nbsp;
            </span>
            <span className={styles.value}>
              {hackathon?.max_team_mates_count || 'Не указано'}
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default HackathonInfoSidebar
