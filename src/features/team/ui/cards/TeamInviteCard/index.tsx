import React from 'react'
import { Button } from '@/shared/ui/shadcn/button'
import styles from './TeamInviteCard.module.scss'
import { TeamInvite } from '@/features/team/model/types'

interface TeamInviteCardProps {
  invite: TeamInvite
  onAccept: (team_id: number) => void
  onReject: (team_id: number) => void
}

export const TeamInviteCard: React.FC<TeamInviteCardProps> = ({
  invite,
  onAccept,
  onReject,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.userData}>
        <span className={styles.username}>
          Приглашение в команду {invite.team_name}
        </span>
      </div>
      <div className={styles.inviteControls}>
        <Button
          value='submit'
          size='sm'
          onClick={() => onAccept(invite.team_id)}
        >
          Принять
        </Button>
        <Button
          variant='destructive'
          size='sm'
          onClick={() => onReject(invite.team_id)}
        >
          Отклонить
        </Button>
      </div>
    </div>
  )
}
