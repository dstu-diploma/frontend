import { useToast } from '@/shared/hooks/use-toast'
import { useEffect, useState } from 'react'
import { TeamInvite, TeamInfo } from '../model/types'
import { teamApi } from '../api'
import { AxiosError } from 'axios'

interface useInvitesProps {
  refreshTeamInfo: (success_message: string) => Promise<void>
}

export const useInvites = ({ refreshTeamInfo }: useInvitesProps) => {
  const { mutate: getTeamInfo } = teamApi.getTeamInfo()
  const { mutate: getUserInvites } = teamApi.getUserInvites()
  const { mutate: acceptInvite } = teamApi.acceptInvite()
  const { mutate: denyInvite } = teamApi.denyInvite()

  const [userInvites, setUserInvites] = useState<TeamInfo[]>([])
  const { toast, dismiss } = useToast()

  useEffect(() => {
    getAllInvites()
  }, [])

  // Получение актуального списка инвайтов
  const getAllInvites = async () => {
    getUserInvites(undefined, {
      onSuccess: async (data: TeamInvite[]) => {
        const userInvites: TeamInfo[] = []

        for (const invite of data) {
          try {
            const team = await new Promise<TeamInfo>((resolve, reject) => {
              getTeamInfo(invite.team_id, {
                onSuccess: resolve,
                onError: reject,
              })
            })
            userInvites.push(team)
          } catch (error) {
            dismiss()
            const axiosError = error as AxiosError
            if (axiosError.response) {
              const data = axiosError.response.data as { detail?: string }
              console.error(
                'Ошибка при получении одного или нескольких приглашений: ',
                data.detail,
              )
              toast({
                variant: 'destructive',
                title: 'Ошибка при получении одного или нескольких приглашений',
                description: data.detail,
              })
            }
          }
        }

        setUserInvites(userInvites)
      },
      onError: error => {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error(
            'Ошибка при получении списка приглашений: ',
            data.detail,
          )
          dismiss()
          toast({
            variant: 'destructive',
            title: 'Ошибка при получении списка приглашений',
            description: data.detail,
          })
        }
      },
    })
  }

  // Обработчик принятия приглашения
  const handleAcceptInvite = (team_id: number) => {
    acceptInvite(team_id, {
      onSuccess: async () => {
        await refreshTeamInfo(`Приглашение успешно в команду принято`)
        setUserInvites([])
      },
      onError: error => {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error('Ошибка при принятии приглашения: ', data.detail)
          dismiss()
          toast({
            variant: 'destructive',
            title: 'Ошибка при принятии приглашения',
            description: data.detail,
          })
        }
      },
    })
  }

  // Обработчик отклонения приглашения
  const handleDenyInvite = async (team_id: number) => {
    denyInvite(team_id, {
      onSuccess: async () => {
        dismiss()
        await getAllInvites()
        toast({
          variant: 'defaultBlueSuccess',
          description: 'Приглашение на участие отклонено',
        })
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error('Ошибка при отклонении приглашения: ', data.detail)
          dismiss()
          toast({
            variant: 'destructive',
            title: 'Ошибка при отклонении приглашения',
            description: data.detail,
          })
        }
      },
    })
  }

  return {
    userInvites,
    handleAcceptInvite,
    handleDenyInvite,
  }
}
