import styles from './HackathonPageScoreCard.module.scss'
import React from 'react'
import clsx from 'clsx'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TeamJudgeScoreObject } from '@/features/hackathons/model/types'

interface HackathonPageScoreCardProps {
  teamName: string
  className?: string
  teamScores: TeamJudgeScoreObject[]
}

const HackathonPageScoreCard = ({
  teamName,
  className,
}: HackathonPageScoreCardProps) => {
  return (
    <div className={clsx(styles.teamScores, className)}>
      <h5>{teamName}</h5>
      <MdKeyboardArrowDown className={styles.dropdownIcon} />
    </div>
  )
}

export default HackathonPageScoreCard
