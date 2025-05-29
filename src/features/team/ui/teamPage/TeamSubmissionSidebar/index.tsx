import React from 'react'
import styles from './HackathonPageSidebar.module.scss'
// import { HackathonTeam } from '@/features/hackathons/model/types'
import { Button } from '@/shared/ui/shadcn/button'

// interface TeamSubmissionSidebarProps {
//   teamInfo: HackathonTeam
// }

const TeamSubmissionSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarSection}>
          <h4>Вложение команды</h4>
        </div>
        <Button variant='destructive'>Удалить вложение</Button>
      </div>
    </div>
  )
}

export default TeamSubmissionSidebar
