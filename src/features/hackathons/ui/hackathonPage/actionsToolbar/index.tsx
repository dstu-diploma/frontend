import React from 'react'
import Link from 'next/link'
import styles from './HackathonPageActionsToolbar.module.scss'
import { ConfirmModal } from '@/features/team'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import { DetailedHackathon } from '@/features/hackathons/model/types'

interface HackathonPageActionsToolbarProps {
  hasTeam: boolean
  onHackathonApply: () => Promise<void>
  isUserTeamApplied: boolean
  hackathonInfo: DetailedHackathon | undefined
}

const HackathonPageActionsToolbar = ({
  hasTeam,
  onHackathonApply,
  isUserTeamApplied,
  hackathonInfo,
}: HackathonPageActionsToolbarProps) => {
  return (
    <Toolbar className={styles.hackathonPageInfoToolbar}>
      {hasTeam ? (
        <div className={styles.hackathonPageInfoToolbarButtons}>
          {!isUserTeamApplied && (
            <ConfirmModal
              title={`Подать заявку на участие в хакатоне ${hackathonInfo?.name}?`}
              submitButtonText='Подать'
              onConfirm={onHackathonApply}
            >
              <Button>Подать заявку на участие</Button>
            </ConfirmModal>
          )}
          {isUserTeamApplied && (
            <Link href={`/hackathons/${hackathonInfo?.id}/my`}>
              <Button>Моя команда</Button>
            </Link>
          )}
        </div>
      ) : (
        <span>У вас нет команды для записи на данный хакатон</span>
      )}
    </Toolbar>
  )
}

export default HackathonPageActionsToolbar
