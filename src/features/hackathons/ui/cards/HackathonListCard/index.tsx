import React from 'react'
import styles from './HackathonListCard.module.scss'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { Button } from '@/shared/ui/shadcn/button/'
import { ConfirmModal } from '@/shared/ui/custom/ConfirmModal/'
import clsx from 'clsx'
import { hackathonApi } from '@/features/hackathons/api'
import { Hackathon } from '@/features/hackathons/model/types'
import { useCustomToast } from '@/shared/lib/helpers/toast'

interface HackathonListCardProps {
  hackathon: Hackathon
  className?: string
}

export const HackathonListCard = ({
  hackathon,
  className,
}: HackathonListCardProps) => {
  const { showToastSuccess, showToastError } = useCustomToast()
  const user = cookiesApi.getUser()
  const { data: hackathonTeams } = hackathonApi.useGetHackathonTeams(
    hackathon.id,
  )
  const { mutate: deleteHackathon } = hackathonApi.useDeleteHackathon()

  const handleDeleteHackathon = () => {
    deleteHackathon(hackathon.id, {
      onSuccess: async () => {
        showToastSuccess(`Хакатон «${hackathon.name}» успешно удален`)
      },
      onError: error => {
        showToastError(error, 'Ошибка при удалении хакатона')
      },
    })
  }

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h5 className={styles.name}>{hackathon.name}</h5>
          <span className={styles.param}>
            Дата начала: {ISOStringToDateString(hackathon.start_date)}
          </span>
          <span className={styles.param}>
            Участвует команд: {hackathonTeams && hackathonTeams?.length}
          </span>
        </div>
        {user.role !== 'user' && (
          <div
            className={styles.actions}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <ConfirmModal
              title='Вы точно хотите удалить хакатон?'
              isCaptainText='Это действие необратимо и удалит все данные, связанные с хакатоном.'
              submitButtonText='Удалить'
              onConfirm={handleDeleteHackathon}
            >
              <Button variant='destructive'>Удалить хакатон</Button>
            </ConfirmModal>
          </div>
        )}
      </div>
    </div>
  )
}
