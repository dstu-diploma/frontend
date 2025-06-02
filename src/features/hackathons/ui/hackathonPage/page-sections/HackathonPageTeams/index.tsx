import React from 'react'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import clsx from 'clsx'
import styles from './HackathonPageTeams.module.scss'
import {
  DetailedHackathon,
  TeamJudgeScoreObject,
} from '@/features/hackathons/model/types'
import { ScoreFormData } from '@/features/hackathons/model/schemas'
import HackathonPageTeamCard from '../../../cards/HackathonPageTeamCard'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface HackathonPageTeamsProps {
  scores: TeamJudgeScoreObject[]
  hackathonInfo: DetailedHackathon | null
  onSetScore: (teamId: number, data: ScoreFormData) => void
  canSetScores: boolean
}

export const HackathonPageTeams = ({
  hackathonInfo,
  onSetScore,
  scores,
  canSetScores,
}: HackathonPageTeamsProps) => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const hackathonTeamsStyles = clsx(styles.hackathonTeams, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Toolbar className={hackathonTeamsStyles}>
      <div
        className={clsx(
          styles.hackathonSectionContainer,
          styles.hackathonTeamsContainer,
        )}
      >
        <h4>Команды-участники</h4>
        <div className={styles.hackathonTeamsList}>
          {hackathonInfo?.teams && hackathonInfo.teams.length > 0 ? (
            hackathonInfo.teams.map(team => (
              <HackathonPageTeamCard
                canSetScores={canSetScores}
                scores={scores}
                key={team.id}
                team={team}
                hackathonInfo={hackathonInfo}
                onSetScore={onSetScore}
              />
            ))
          ) : (
            <div className={styles.noCriteria}>
              <span>На данный момент нет команд-участников</span>
            </div>
          )}
        </div>
      </div>
    </Toolbar>
  )
}
