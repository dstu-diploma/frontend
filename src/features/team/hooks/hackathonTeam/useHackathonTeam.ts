import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { teamApi } from '../../api'
import { TeamMateRef } from '../../model/types'
import { useEffect, useState } from 'react'
import { toast } from '@/shared/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useRouter } from 'next/navigation'
import { hackathonApi } from '@/features/hackathons/api'

export const useHackathonTeam = (page_id: number) => {
  // Данные о команде
  const hackathonId = Number(page_id)

  const router = useRouter()
  const [hasLeftTeam, setHasLeftTeam] = useState(false)

  const queryClient = useQueryClient()
  const { data: hackathonInfo, isLoading: isHackathonLoading } =
    hackathonApi.useGetHackathonById(hackathonId)
  const {
    data: teamInfo,
    isPending: isTeamLoading,
    isError: isTeamLoadingError,
  } = teamApi.useGetMyHackathonTeamInfo(hackathonId)

  // Мутации для изменения данных
  const { mutate: kickMate } = teamApi.useKickHackathonTeamMate(hackathonId)
  const { mutate: setCaptainRights } =
    teamApi.useSetHackathonTeamCaptainRights(hackathonId)

  useEffect(() => {
    if (isTeamLoadingError && !hasLeftTeam) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить информацию о команде',
        variant: 'destructive',
      })
    }
  }, [isTeamLoadingError, hasLeftTeam])

  // Вычисленные значения
  const hasTeam = !!teamInfo
  const currentUser = teamInfo?.mates?.find(
    mate => mate.user_id === cookiesApi.getUser()?.id,
  )
  const isCaptain = currentUser?.is_captain || false
  const teamRole = currentUser?.role_desc || ''
  const nonCaptainMates =
    teamInfo?.mates?.filter(mate => !mate.is_captain) || []
  const teamName = teamInfo?.name

  // Обработчик выхода из команды
  const handleTeamLeave = async (event: React.FormEvent) => {
    event.preventDefault()
    setHasLeftTeam(true)
    kickMate(
      { mate_id: Number(currentUser?.user_id) },
      {
        onSuccess: async () => {
          notificationService.success(
            `Вы успешно покинули команду «${teamInfo?.name}»`,
          )
          queryClient.invalidateQueries({
            queryKey: ['hackathonById', hackathonId],
          })
          router.push(`/hackathons/${page_id}`)
        },
        onError: error => {
          setHasLeftTeam(false)
          notificationService.error(error, `Ошибка при выходе из команды`)
        },
      },
    )
  }

  // Обработчик исключения участника из команды
  const handleTeamKick = async (
    event: React.FormEvent,
    member: TeamMateRef,
  ) => {
    event.preventDefault()
    kickMate(
      { mate_id: member.user_id },
      {
        onSuccess: async () =>
          notificationService.success(
            `Участник ${member.user_name} успешно исключен из команды`,
          ),
        onError: error =>
          notificationService.error(error, `Ошибка при исключении участника`),
      },
    )
  }

  // Обработчик назначения капитана
  const handleChangeCaptain = async (
    event: React.FormEvent,
    member: TeamMateRef,
  ) => {
    event.preventDefault()
    const requestBody = {
      user_id: member.user_id,
      is_captain: !member.is_captain,
    }
    setCaptainRights(requestBody, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['myHackathonTeam', hackathonId],
        })
        const success_message = !member.is_captain
          ? `Участник ${member?.user_name} успешно назначен капитаном`
          : `Участник ${member?.user_name} успешно снят с должности капитана`
        notificationService.success(success_message)
      },
      onError: error =>
        notificationService.error(error, `Ошибка при назначении капитана`),
    })
  }

  return {
    hackathonInfo,
    isHackathonLoading,
    isCaptain,
    teamName,
    teamRole,
    nonCaptainMates,
    isTeamLoading,
    hasTeam,
    teamInfo,
    teamMates: teamInfo?.mates,
    handleTeamLeave,
    handleTeamKick,
    handleChangeCaptain,
  }
}
