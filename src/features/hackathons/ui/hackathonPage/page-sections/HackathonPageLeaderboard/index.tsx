import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import styles from './HackathonPageLeaderboard.module.scss'
import React from 'react'
import { hackathonApi } from '@/features/hackathons/api'
import { HackathonLeader } from '@/features/hackathons/model/types'
import HackathonPageBoardCard from '../../../cards/HackathonPageBoardCard'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { Button } from '@/shared/ui/shadcn/button'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'
import EntityLoading from '@/shared/ui/custom/fallback/EntityLoading'
import { isAdminOrOrganizer } from '@/shared/lib/helpers/roleMapping'

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

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const leaderboardStyles = clsx(styles.hackathonLeaderboard, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Toolbar className={leaderboardStyles}>
      <div className={styles.sectionInfo}>
        <h4>Таблица лидеров</h4>
        {user && isAdminOrOrganizer() && (
          <Button onClick={calculateResults}>Рассчитать результаты</Button>
        )}
      </div>
      <div className={styles.leaders}>
        {leaderboard && leaderboard.length > 0 ? (
          leaderboard.map((team: HackathonLeader, index: number) => (
            <HackathonPageBoardCard
              key={team.team_name}
              leader={team}
              position={index + 1}
            />
          ))
        ) : (
          <span className={styles.noLeaderboardMessage}>
            Члены жюри не устанавливали оценок командам в течение хакатона
          </span>
        )}
        {!leaderboard && <EntityLoading />}
      </div>
    </Toolbar>
  )
}

export default HackathonPageLeaderboard
