import { teamApi } from '@/features/team'
import { useState, useEffect } from 'react'
import { hackathonApi } from '../api'
import { DescriptionFormData, HackathonFormData } from '../model/schemas'
import { useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useRouter } from 'next/navigation'

export const useHackathonPage = (page_id: number) => {
  const queryClient = useQueryClient()
  const hackathonId = Number(page_id)
  const router = useRouter()

  // Полученные данных о сущностях
  const {
    data: hackathonInfo,
    isPending: isHackathonLoading,
    error: hackathonLoadError,
  } = hackathonApi.useGetHackathonById(hackathonId)
  const { data: myTeamInfo, isSuccess: isTeamInfoLoaded } =
    teamApi.useGetMyTeamInfo()
  const { data: myHackathonTeamInfo, isSuccess: isMyHackathonTeamInfoLoaded } =
    teamApi.useGetMyHackathonTeamInfo(hackathonId)

  // Мутация для изменения данных о хакатоне
  const { mutate: applyToHackathon } = teamApi.useApplyToHackathon(hackathonId)
  const { mutate: updateHackathon } =
    hackathonApi.useUpdateHackathonInfo(hackathonId)

  const [mateIds, setMateIds] = useState<number[]>([])
  const [hasTeam, setHasTeam] = useState<boolean>(false)
  const [isUserTeamApplied, setIsUserTeamApplied] = useState<boolean>(false)

  // Функция для загрузки и обновления информации о хакатоне
  useEffect(() => {
    if (hackathonLoadError) {
      notificationService.error(
        hackathonLoadError,
        `Ошибка при получении информации о хакатоне`,
      )
    }
  }, [page_id, hackathonLoadError])

  // Установка флага наличия команды-бренда и флага участия в хакатоне
  useEffect(() => {
    if (isTeamInfoLoaded && myTeamInfo) {
      setHasTeam(true)
      setMateIds(myTeamInfo?.mates.map(mate => mate.user_id))
    }

    if (isMyHackathonTeamInfoLoaded && myHackathonTeamInfo) {
      setIsUserTeamApplied(true)
    }
  }, [
    page_id,
    isTeamInfoLoaded,
    myTeamInfo,
    isMyHackathonTeamInfoLoaded,
    myHackathonTeamInfo,
  ])

  // Отправка заявки на участие в хакатоне
  const handleApplicationSubmit = async () => {
    const requestBody = {
      hackathon_id: Number(page_id),
      mate_user_ids: mateIds,
    }
    applyToHackathon(requestBody, {
      onSuccess: async () => {
        notificationService.success(
          `Вы успешно записали команду на хакатон «${hackathonInfo?.name}»`,
        )
        setIsUserTeamApplied(true)
        router.push(`/hackathons/${page_id}/my`)
      },
      onError: error =>
        notificationService.error(
          error,
          `Ошибка при записи команды на хакатон`,
        ),
    })
  }

  // Обновление информации о хакатоне
  const handleHackathonUpdate = async (data: HackathonFormData) => {
    const requestBody = {
      ...data,
      max_participant_count: Number(data.max_participant_count),
      max_team_mates_count: Number(data.max_team_mates_count),
    }
    updateHackathon(requestBody, {
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ['hackathonById'] })
        notificationService.success(`Информация о хакатоне успешно обновлена`)
      },
      onError: error => {
        notificationService.error(
          error,
          `Ошибка при обновлении информации о хакатоне`,
        )
      },
    })
  }

  // Обновление описания хакатона
  const handleEditHackathonDescription = async (data: DescriptionFormData) => {
    updateHackathon(
      {
        description: data.description,
      },
      {
        onSuccess: async () => {
          notificationService.success(`Описание хакатона успешно обновлено`)
        },
        onError: error => {
          notificationService.error(
            error,
            `Ошибка при обновлении описания хакатона`,
          )
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
    handleEditHackathonDescription,
  }
}
