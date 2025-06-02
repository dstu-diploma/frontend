import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import styles from './HackathonPageLeaderboard.module.scss'
import React from 'react'
import { hackathonApi } from '@/features/hackathons/api'
import { HackathonLeader } from '@/features/hackathons/model/types'
import HackathonPageBoardCard from '../../../cards/HackathonPageBoardCard'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { Button } from '@/shared/ui/shadcn/button'
import { notificationService } from '@/shared/lib/services/notification.service'

interface HackathonPageLeaderboardProps {
  hackathonId: number
}

const HackathonPageLeaderboard = ({
  hackathonId,
}: HackathonPageLeaderboardProps) => {
  const user = cookiesApi.getUser()
  const { data: leaderboard } = hackathonApi.useGetLeaderboard(hackathonId)
  const { mutate: setHackathonResults } =
    hackathonApi.useCalculateHackathonResults(hackathonId)

  const calculateResults = () => {
    setHackathonResults(undefined, {
      onSuccess: () => {
        notificationService.success(`Результаты хакатона успешно рассчитаны!`)
      },
      onError: error => {
        notificationService.error(error, `Ошибка при расчёте результатов`)
      },
    })
  }

  return (
    <Toolbar className={styles.hackathonLeaderboard}>
      <div className={styles.sectionInfo}>
        <h4>Таблица лидеров</h4>
        {user && (user.role === 'admin' || user.role === 'organizer') && (
          <Button onClick={calculateResults}>Рассчитать результаты</Button>
        )}
      </div>
      <div className={styles.leaders}>
        {leaderboard &&
          leaderboard.map((team: HackathonLeader, index: number) => (
            <HackathonPageBoardCard
              key={team.team_name}
              leader={team}
              position={index + 1}
            />
          ))}
      </div>
    </Toolbar>
  )
}

export default HackathonPageLeaderboard
