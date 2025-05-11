import React from 'react'
import styles from './HackathonInfoSidebar.module.scss'
import { DetailedHackathon } from '../../model/types'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { Button } from '@/shared/ui/shadcn/button'
import { ActionModal } from '@/features/team'
import HackathonInfoSidebarForm from './HackathonInfoSidebarForm'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'

interface HackathonInfoSidebarProps {
  hackathon: DetailedHackathon | null
  style?: React.CSSProperties
}

const HackathonInfoSidebar = ({
  hackathon,
  style,
}: HackathonInfoSidebarProps) => {
  return (
    <aside className={styles.sidebar} style={style}>
      <div className={styles.sidebarBlock}>
        <h4>Информация о хакатоне</h4>
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
          <li className={styles.navItem}>
            <span className={styles.param}>
              Команд подало заявку на участие&nbsp;
            </span>
            <span className={styles.value}>
              {hackathon?.teams.length || '0'}
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Членов жюри&nbsp;</span>
            <span className={styles.value}>
              {hackathon?.judges.length || '0'}
            </span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Критериев оценки&nbsp;</span>
            <span className={styles.value}>
              {hackathon?.criteria.length || '0'}
            </span>
          </li>
        </ul>
        <div className={styles.hackathonSidebarActions}>
          {isPrivilegedRole() && (
            <ActionModal
              title='Изменение информации о хакатоне'
              trigger={<Button>Изменить</Button>}
              submitButtonText='Изменить'
              onSave={() => {
                console.log('Изменить')
              }}
            >
              <HackathonInfoSidebarForm />
            </ActionModal>
          )}
        </div>
      </div>
    </aside>
  )
}

export default HackathonInfoSidebar
