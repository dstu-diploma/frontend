import { teamApi } from '@/features/team'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { hackathonApi } from '../api'
import { DetailedHackathon } from '../model/types'
import { adminApi } from '@/features/admin/api'
import { HackathonFormData } from '../model/schemas'

export const useHackathonPage = (page_id: number) => {
  const { toast, dismiss } = useToast()
  const { mutate: getHackathonById, isPending: isHackathonLoading } =
    hackathonApi.getHackathonById()
  const { mutate: getMyHackathonTeam } = hackathonApi.getMyHackathonTeam()
  const { mutate: getMyTeamInfo } = teamApi.getMyTeamInfo()
  const { mutate: applyToHackathon } = teamApi.applyToHackathon()
  const { mutate: updateHackathon } = adminApi.updateHackathonInfo()

  const [hackathonInfo, setHackathonInfo] = useState<DetailedHackathon | null>(
    null,
  )
  const [hasTeam, setHasTeam] = useState<boolean>(false)
  const [isUserTeamApplied, setIsUserTeamApplied] = useState<boolean>(false)
  const [mateIds, setMateIds] = useState<number[]>([])

  // Функция для загрузки и обновления информации о хакатоне
  const loadHackathonInfo = useCallback(async () => {
    getHackathonById(Number(page_id), {
      onSuccess: data => setHackathonInfo(data),
      onError: error => {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при получении информации о хакатоне',
            description: errorData.detail,
          })
        }
      },
    })
  }, [page_id, getHackathonById, toast])

  // Получение информации о хакатоне при монтировании компонента
  useEffect(() => {
    loadHackathonInfo()
  }, [loadHackathonInfo])

  // Получение информации об участниках команды текущего пользователя
  useEffect(() => {
    getMyTeamInfo(undefined, {
      onSuccess: data => {
        setMateIds(data.mates.map(mate => mate.user_id))
      },
    })
  }, [])

  // Установка флага наличия команды
  useEffect(() => {
    if (mateIds.length > 0) {
      setHasTeam(true)
    }
  }, [mateIds])

  // Установка флага участия в хакатоне
  useEffect(() => {
    if (mateIds.length > 0) {
      getMyHackathonTeam(Number(page_id), {
        onSuccess: () => {
          setIsUserTeamApplied(true)
        },
        onError: error => {
          console.error(
            'Ошибка при получении информации об участниках команды:',
            error,
          )
          setIsUserTeamApplied(false)
        },
      })
    }
  }, [mateIds, page_id, getMyHackathonTeam])

  // Отправка заявки на участие в хакатоне
  const handleApplicationSubmit = async () => {
    const requestBody = {
      hackathon_id: Number(page_id),
      mate_user_ids: mateIds,
    }
    applyToHackathon(requestBody, {
      onSuccess: async () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: `Заявка на участие в хакатоне ${hackathonInfo?.name} отправлена`,
        })
        await loadHackathonInfo()
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при отправлении заявки на хакатон',
            description: errorData.detail,
          })
          console.error('Ошибка при отправлении заявки на хакатон:', errorData)
        }
      },
    })
  }

  // Обновление информации о хакатоне
  const handleHackathonUpdate = async (data: HackathonFormData) => {
    console.log(data)
    updateHackathon(
      {
        hackathon_id: Number(page_id),
        data: {
          ...data,
          max_participant_count: Number(data.max_participant_count),
          max_team_mates_count: Number(data.max_team_mates_count),
        },
      },
      {
        onSuccess: async () => {
          dismiss()
          toast({
            variant: 'defaultBlueSuccess',
            description: `Информация о хакатоне успешно обновлена`,
          })
          await loadHackathonInfo()
        },
        onError: error => {
          dismiss()
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const errorData = axiosError.response.data as { detail: string }
            toast({
              variant: 'destructive',
              title: 'Ошибка при обновлении информации о хакатоне',
              description: errorData.detail,
            })
            console.error(
              'Ошибка при обновлении информации о хакатоне:',
              errorData,
            )
          }
        },
      },
    )
  }

  return {
    hasTeam,
    isUserTeamApplied,
    hackathonInfo,
    isHackathonLoading,
    handleApplicationSubmit,
    handleHackathonUpdate,
  }
}
