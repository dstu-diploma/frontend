import { memo, useCallback } from 'react'
import styles from './HackathonListCard.module.scss'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { Button } from '@/shared/ui/shadcn/button/'
import { ConfirmModal } from '@/shared/ui/custom/modals/ConfirmModal'
import clsx from 'clsx'
import { hackathonApi } from '@/features/hackathons/api'
import { Hackathon } from '@/features/hackathons/model/types'
import { notificationService } from '@/shared/lib/services/notification.service'

interface HackathonInfoProps {
  hackathon: Hackathon
  teamsCount?: number
}

const HackathonInfo = memo(({ hackathon, teamsCount }: HackathonInfoProps) => (
  <div className={styles.info}>
    <h5 className={styles.name}>{hackathon.name}</h5>
    <span className={styles.param}>ID хакатона: {hackathon.id}</span>
    <span className={styles.param}>
      Дата начала: {ISOStringToDateString(hackathon.start_date)}
    </span>
    <span className={styles.param}>Участвует команд: {teamsCount}</span>
  </div>
))

HackathonInfo.displayName = 'HackathonInfo'

interface HackathonActionsProps {
  hackathon: Hackathon
  onDelete: (hackathonId: number) => void
}

const HackathonActions = memo(
  ({ hackathon, onDelete }: HackathonActionsProps) => {
    const handleDeleteHackathon = useCallback(() => {
      onDelete(hackathon.id)
    }, [hackathon.id, onDelete])

    return (
      <div
        className={styles.actions}
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <ConfirmModal
          title='Вы точно хотите удалить хакатон?'
          warning={{
            type: 'danger',
            message:
              'Это действие необратимо и удалит все данные, связанные с хакатоном.',
          }}
          submitButtonText='Удалить'
          onConfirm={handleDeleteHackathon}
        >
          <Button variant='destructive'>Удалить хакатон</Button>
        </ConfirmModal>
      </div>
    )
  },
)

HackathonActions.displayName = 'HackathonActions'

interface HackathonListCardProps {
  hackathon: Hackathon
  className?: string
}

const HackathonListCard = memo(
  ({ hackathon, className }: HackathonListCardProps) => {
    const user = cookiesApi.getUser()
    const { data: hackathonTeams } = hackathonApi.useGetHackathonTeams(
      hackathon.id,
    )
    const { mutate: deleteHackathon } = hackathonApi.useDeleteHackathon()
    const canDeleteHackathon = user && user.role === 'admin'

    const handleDeleteHackathon = useCallback(
      (hackathonId: number) => {
        deleteHackathon(hackathonId, {
          onSuccess: async () => {
            notificationService.success(
              `Хакатон «${hackathon.name}» успешно удален`,
            )
          },
          onError: error => {
            notificationService.error(error, 'Ошибка при удалении хакатона')
          },
        })
      },
      [deleteHackathon, hackathon.name],
    )

    return (
      <div className={clsx(styles.card, className)}>
        <div className={styles.infoContainer}>
          <HackathonInfo
            hackathon={hackathon}
            teamsCount={hackathonTeams?.length}
          />
          {canDeleteHackathon && (
            <HackathonActions
              hackathon={hackathon}
              onDelete={handleDeleteHackathon}
            />
          )}
        </div>
      </div>
    )
  },
)

HackathonListCard.displayName = 'HackathonListCard'

export default HackathonListCard
