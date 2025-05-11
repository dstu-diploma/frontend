import React, { useEffect, useState } from 'react'
import { Hackathon, HackathonTeam } from '../../model/types'
import styles from './HackathonListCard.module.scss'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { hackathonApi } from '../../api'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { Button } from '@/shared/ui/shadcn/button/'
import { ConfirmModal } from '@/shared/ui/custom/ConfirmModal/'
import { adminApi } from '@/features/admin/api'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import { useHackathons } from '../../hooks/useHackathons'
import clsx from 'clsx'

interface HackathonListCardProps {
  hackathon: Hackathon
  className?: string
}

export const HackathonListCard = ({
  hackathon,
  className,
}: HackathonListCardProps) => {
  const user = cookiesApi.getUser()
  const { toast, dismiss } = useToast()
  const { mutate: getHackathonTeams } = hackathonApi.getHackathonTeams()
  const { mutate: deleteHackathon } = adminApi.deleteHackathon()
  const [hackathonTeams, setHackathonTeams] = useState<HackathonTeam[]>([])
  const { getAllHackathons } = useHackathons()

  useEffect(() => {
    getHackathonTeams(hackathon.id, {
      onSuccess: data => {
        setHackathonTeams(data)
      },
    })
  }, [])

  const handleDeleteHackathon = () => {
    deleteHackathon(hackathon.id, {
      onSuccess: async () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: `Хакатон «${hackathon.name}» успешно удален`,
        })
        await getAllHackathons()
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при удалении хакатона',
            description: errorData.detail,
          })
          console.error('Ошибка при удалении хакатона:', errorData.detail)
        }
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
            Участвует команд: {hackathonTeams.length}
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
