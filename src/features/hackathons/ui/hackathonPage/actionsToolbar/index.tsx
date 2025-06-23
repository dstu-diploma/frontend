import React, { useMemo } from 'react'
import Link from 'next/link'
import styles from './HackathonPageActionsToolbar.module.scss'
import { ConfirmModal } from '@/features/team'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import { DetailedHackathon } from '@/features/hackathons/model/types'

interface HackathonPageActionsToolbarProps {
  hasTeam: boolean
  onHackathonApply: () => void
  isUserTeamApplied: boolean
  isUserTeamCaptain: boolean
  hackathonInfo: DetailedHackathon
}

const HackathonPageActionsToolbar = ({
  hasTeam,
  onHackathonApply,
  isUserTeamApplied,
  isUserTeamCaptain,
  hackathonInfo,
}: HackathonPageActionsToolbarProps) => {
  const isHackathonStarted = useMemo(() => {
    const now = new Date()
    const startDate = new Date(hackathonInfo.start_date)
    return now >= startDate
  }, [hackathonInfo.start_date])

  return (
    <Toolbar className={styles.hackathonPageInfoToolbar}>
      {!isUserTeamApplied && isHackathonStarted ? (
        <div className={styles.message}>
          <span>Запись на данный хакатон уже закрыта</span>
        </div>
      ) : hasTeam && isUserTeamCaptain ? (
        <div className={styles.hackathonPageInfoToolbarButtons}>
          {!isUserTeamApplied && isUserTeamCaptain && (
            <ConfirmModal
              title={`Произвести запись команды на хакатон «${hackathonInfo?.name}»?`}
              submitButtonText='Записать'
              onConfirm={onHackathonApply}
            >
              <Button>Записать свою команду на хакатон</Button>
            </ConfirmModal>
          )}
          {isUserTeamApplied && (
            <Link href={`/hackathons/${hackathonInfo?.id}/my`}>
              <Button>Моя команда на хакатоне</Button>
            </Link>
          )}
        </div>
      ) : hasTeam && !isUserTeamCaptain ? (
        <div className={styles.message}>
          <span>
            Вам нужно быть капитаном Вашей команды, чтобы записаться на хакатон
          </span>
        </div>
      ) : (
        <div className={styles.message}>
          <span>У вас нет команды для записи на данный хакатон</span>
        </div>
      )}
    </Toolbar>
  )
}

export default HackathonPageActionsToolbar
