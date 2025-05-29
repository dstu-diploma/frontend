import React from 'react'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import clsx from 'clsx'
import styles from './HackathonPageTeams.module.scss'
import { DetailedHackathon } from '@/features/hackathons/model/types'
import { ScoreFormData } from '@/features/hackathons/model/schemas'
import HackathonPageTeamCard from '../../../cards/HackathonPageTeamCard'

interface HackathonPageTeamsProps {
  hackathonInfo: DetailedHackathon | null
  onSetScore: (teamId: number, data: ScoreFormData) => void
}

export const HackathonPageTeams = ({
  hackathonInfo,
  onSetScore,
}: HackathonPageTeamsProps) => {
  return (
    <Toolbar className={styles.hackathonTeams}>
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
