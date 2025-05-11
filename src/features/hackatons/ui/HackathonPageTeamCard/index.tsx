import clsx from 'clsx'
import React from 'react'
import styles from './HackathonPageTeamCard.module.scss'
import { HackathonTeam } from '../../model/types'

interface HackathonPageTeamCardProps {
  team: HackathonTeam
  className?: string
}

const HackathonPageTeamCard = ({
  team,
  className,
}: HackathonPageTeamCardProps) => {
  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h5 className={styles.name}>{team.name}</h5>
        </div>
      </div>
    </div>
  )
}

export default HackathonPageTeamCard
