import { teamApi } from '@/features/team'
import { useState, useEffect } from 'react'
import { hackathonApi } from '../api'
import { DescriptionFormData, HackathonFormData } from '../model/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCustomToast } from '@/shared/lib/helpers/toast'

export const useHackathonPage = (page_id: number) => {
  const { showToastSuccess, showToastError } = useCustomToast()
  const queryClient = useQueryClient()

  // Полученные данные о сущностях
  const {
    data: hackathonInfo,
    isPending: isHackathonLoading,
    error: hackathonLoadError,
  } = hackathonApi.useGetHackathonById(Number(page_id))
  const { data: myTeamInfo, isSuccess: isMyTeamInfoLoaded } =
    teamApi.useGetMyTeamInfo()

  // Мутация для изменения данных о хакатоне
  const { mutate: applyToHackathon } = useMutation({
    mutationFn: teamApi.applyToHackathon,
  })
  const { mutate: updateHackathon } = hackathonApi.useUpdateHackathonInfo()

  const [mateIds, setMateIds] = useState<number[]>([])
  const [hasTeam, setHasTeam] = useState<boolean>(false)
  const [isUserTeamApplied, setIsUserTeamApplied] = useState<boolean>(false)

  // Функция для загрузки и обновления информации о хакатоне
  useEffect(() => {
    if (hackathonLoadError) {
      showToastError(
        hackathonLoadError,
        `Ошибка при получении информации о хакатоне`,
      )
    }
  }, [page_id])

  // Установка флага участия в хакатоне
  useEffect(() => {
    if (isMyTeamInfoLoaded && myTeamInfo && myTeamInfo.mates.length > 0) {
      setHasTeam(true)
      setMateIds(myTeamInfo?.mates.map(mate => mate.user_id))
    }
  }, [page_id])

  // Отправка заявки на участие в хакатоне
  const handleApplicationSubmit = async () => {
    const requestBody = {
      hackathon_id: Number(page_id),
      mate_user_ids: mateIds,
    }
    applyToHackathon(requestBody, {
      onSuccess: async () => {
        showToastSuccess(
          `Заявка на участие в хакатоне ${hackathonInfo?.name} отправлена`,
        )
        setIsUserTeamApplied(true)
      },
      onError: error =>
        showToastError(error, `Ошибка при отправлении заявки на хакатон`),
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
          queryClient.invalidateQueries({ queryKey: ['hackathonById'] })
          showToastSuccess(`Информация о хакатоне успешно обновлена`)
        },
        onError: error => {
          showToastError(error, `Ошибка при обновлении информации о хакатоне`)
        },
      },
    )
  }

  // Обновление описания хакатона
  const handleEditHackathonDescription = async (data: DescriptionFormData) => {
    console.log(data)
    updateHackathon(
      {
        hackathon_id: Number(page_id),
        data: { description: data.description },
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: ['hackathonById'] })
          showToastSuccess(`Описание хакатона успешно обновлено`)
        },
        onError: error => {
          showToastError(error, `Ошибка при обновлении описания хакатона`)
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
