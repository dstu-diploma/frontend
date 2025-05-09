import { UserPartial } from '@/features/user/model/types'
import TeamMemberCardAvatar from './TeamMemberCardAvatar'
import { Button } from '@/shared/ui/shadcn/button'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { ConfirmModal } from '../../../../../shared/ui/custom/ConfirmModal'
import { useTeam } from '@/features/team/hooks/useTeam'
import styles from './TeamMemberCard.module.scss'
import { useEffect, useState } from 'react'

interface TeamMemberCardProps {
  member: UserPartial
  isCaptain: boolean
}

export const TeamMemberCard = ({ member, isCaptain }: TeamMemberCardProps) => {
  const user = cookiesApi.getUser()
  const { handleTeamKick, handleChangeCaptain, updateKey, teamMates } =
    useTeam()
  const [localMember, setLocalMember] = useState(member)

  useEffect(() => {
    if (teamMates) {
      const updatedMember = teamMates.find(m => m.id === member.id)
      if (updatedMember) {
        setLocalMember(updatedMember)
      }
    }
  }, [teamMates, member.id])

  return (
    <div className={styles.card} key={`${localMember.id}-${updateKey}`}>
      <div className={styles.mateInfo}>
        <TeamMemberCardAvatar member={localMember} />
        <div className={styles.info}>
          <h4 className={styles.name}>
            {localMember.first_name} {localMember.last_name}
          </h4>
          <p className={styles.role}>
            {localMember.is_captain && 'Капитан, '}
            {localMember?.role_desc
              ? localMember?.role_desc
              : 'Роль в команде не указана'}
          </p>
        </div>
      </div>
      {localMember.id !== user.id && isCaptain && (
        <div
          className={styles.captainControls}
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          {!localMember.is_captain && (
            <ConfirmModal
              title={`Назначить пользователя ${localMember.first_name} ${localMember.last_name} капитаном?`}
              submitButtonText='Назначить'
              onConfirm={(e: React.FormEvent) =>
                handleChangeCaptain(e, localMember)
              }
            >
              <Button>Установить капитаном</Button>
            </ConfirmModal>
          )}
          {localMember.is_captain && (
            <ConfirmModal
              title={`Снять права капитана с пользователя ${localMember.first_name} ${localMember.last_name}?`}
              submitButtonText='Cнять права'
              onConfirm={(e: React.FormEvent) =>
                handleChangeCaptain(e, localMember)
              }
            >
              <Button>Снять права капитана</Button>
            </ConfirmModal>
          )}
          <ConfirmModal
            title={`Вы действительно хотите исключить пользователя ${localMember.first_name} ${localMember.last_name}?`}
            submitButtonText='Исключить'
            onConfirm={event => handleTeamKick(event, localMember)}
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
