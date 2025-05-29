import TeamMemberCardAvatar from './TeamMemberCardAvatar'
import { Button } from '@/shared/ui/shadcn/button'
import { ConfirmModal } from '../../../../../shared/ui/custom/modals/ConfirmModal'
import styles from './TeamMemberCard.module.scss'
import { TeamMateRef } from '@/features/team/model/types'
import { cookiesApi } from '@/shared/lib/helpers/cookies'

interface TeamMemberCardProps {
  isCaptain: boolean
  member: TeamMateRef
  onChangeRights: (e: React.FormEvent, member: TeamMateRef) => void
  onKick: (e: React.FormEvent, member: TeamMateRef) => void
}

export const TeamMemberCard = ({
  isCaptain,
  member,
  onChangeRights,
  onKick,
}: TeamMemberCardProps) => {
  const user = cookiesApi.getUser()
  if (!user) {
    return
  }
  return (
    <div className={styles.card}>
      <div className={styles.mateInfo}>
        <TeamMemberCardAvatar member={member} />
        <div className={styles.info}>
          <h4 className={styles.name}>{member.user_name}</h4>
          <p className={styles.role}>
            {member.is_captain && 'Капитан, '}
            {member?.role_desc
              ? member?.role_desc
              : 'Роль в команде не указана'}
          </p>
        </div>
      </div>
      {member.user_id !== user.id && isCaptain && (
        <div
          className={styles.captainControls}
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          {!member.is_captain && (
            <ConfirmModal
              title={`Назначить пользователя ${member.user_name} капитаном?`}
              submitButtonText='Назначить'
              onConfirm={(e: React.FormEvent) => onChangeRights(e, member)}
            >
              <Button>Установить капитаном</Button>
            </ConfirmModal>
          )}
          {member.is_captain && (
            <ConfirmModal
              title={`Снять права капитана с пользователя ${member.user_name}?`}
              submitButtonText='Cнять права'
              onConfirm={(e: React.FormEvent) => onChangeRights(e, member)}
            >
              <Button>Снять права капитана</Button>
            </ConfirmModal>
          )}
          <ConfirmModal
            title={`Вы действительно хотите исключить пользователя ${member.user_name}?`}
            submitButtonText='Исключить'
            onConfirm={event => onKick(event, member)}
          >
            <Button variant='destructive' className={styles.kickButton}>
              Исключить
            </Button>
          </ConfirmModal>
        </div>
      )}
    </div>
  )
}
