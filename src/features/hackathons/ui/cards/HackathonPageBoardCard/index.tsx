import React from 'react'
import styles from './HackathonPageBoardCard.module.scss'
import clsx from 'clsx'
import { HackathonLeader } from '@/features/hackathons/model/types'

interface HackathonPageBoardCardProps {
  leader: HackathonLeader
  className?: string
  position: number
}

const HackathonPageBoardCard = ({
  leader,
  className,
  position,
}: HackathonPageBoardCardProps) => {
  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.position}>
        {position <= 3 ? (
          <div className={clsx(styles.medal, styles[`medal${position}`])}>
            {position}
          </div>
        ) : (
          <div className={styles.positionNumber}>{position}</div>
        )}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h5 className={styles.name}>{leader.team_name}</h5>
        </div>
        <div className={styles.score}>
          Счёт по оценкам:{' '}
          <span className={styles.scoreValue}>{leader.score}</span>
        </div>
      </div>
    </div>
  )
}

export default HackathonPageBoardCard
