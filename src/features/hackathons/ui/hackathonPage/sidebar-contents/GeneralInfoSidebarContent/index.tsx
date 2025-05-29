import React from 'react'
import styles from './GeneralInfoSidebarContent.module.scss'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { DetailedHackathon } from '@/features/hackathons/model/types'

interface GeneralInfoSidebarContentProps {
  hackathon: DetailedHackathon
}

const GeneralInfoSidebarContent = ({
  hackathon,
}: GeneralInfoSidebarContentProps) => {
  return (
    <div className={styles.sidebarInfo}>
      <div className={styles.sidebarInfoItem}>
        <span className={styles.sidebarInfoLabel}>Дата начала:</span>
        <span className={styles.sidebarInfoValue}>
          {ISOStringToDateString(hackathon.start_date)}
        </span>
      </div>
      <div className={styles.sidebarInfoItem}>
        <span className={styles.sidebarInfoLabel}>Дата начала оценок:</span>
        <span className={styles.sidebarInfoValue}>
          {ISOStringToDateString(hackathon.score_start_date)}
        </span>
      </div>
      <div className={styles.sidebarInfoItem}>
        <span className={styles.sidebarInfoLabel}>Дата окончания:</span>
        <span className={styles.sidebarInfoValue}>
          {ISOStringToDateString(hackathon.end_date)}
        </span>
      </div>
      <div className={styles.sidebarInfoItem}>
        <span className={styles.sidebarInfoLabel}>
          Макс. количество участников:
        </span>
        <span className={styles.sidebarInfoValue}>
          {hackathon.max_participant_count}
        </span>
      </div>
      <div className={styles.sidebarInfoItem}>
        <span className={styles.sidebarInfoLabel}>Макс. размер команды:</span>
        <span className={styles.sidebarInfoValue}>
          {hackathon.max_team_mates_count}
        </span>
      </div>
      <div className={styles.sidebarInfoItem}>
        <span className={styles.sidebarInfoLabel}>Записавшихся команд:</span>
        <span className={styles.sidebarInfoValue}>
          {hackathon.teams.length}
        </span>
      </div>
      <div className={styles.sidebarInfoItem}>
        <span className={styles.sidebarInfoLabel}>Критериев оценки:</span>
        <span className={styles.sidebarInfoValue}>
          {hackathon.criteria.length}
        </span>
      </div>
      <div className={styles.sidebarInfoItem}>
        <span className={styles.sidebarInfoLabel}>Членов жюри:</span>
        <span className={styles.sidebarInfoValue}>
          {hackathon.judges.length}
        </span>
      </div>
    </div>
  )
}

export default GeneralInfoSidebarContent
