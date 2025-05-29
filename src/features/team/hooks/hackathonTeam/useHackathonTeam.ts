import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { teamApi } from '../../api'
import { TeamMateRef } from '../../model/types'
import { useEffect } from 'react'
import { toast } from '@/shared/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

export const useHackathonTeam = (page_id: number) => {
  // Данные о команде
  const hackathonId = Number(page_id)

  const queryClient = useQueryClient()
  const {
    data: teamInfo,
    isPending: isTeamLoading,
    isError: isTeamLoadingError,
  } = teamApi.useGetMyHackathonTeamInfo(hackathonId)
  const { data: teamMates, isPending: isTeamMatesLoading } =
    teamApi.useGetTeamMates()

  // Мутации для изменения данных
  const { mutate: leaveTeam } = teamApi.useLeaveHackathonTeam()
  const { mutate: kickMate } = teamApi.useKickHackathonTeamMate()
  const { mutate: setCaptainRights } =
    teamApi.useSetHackathonTeamCaptainRights()

  // Вычисленные значения
  const hasTeam = !!teamInfo
  const currentUser = teamMates?.find(
    mate => mate.user_id === cookiesApi.getUser()?.id,
  )
  const isCaptain = currentUser?.is_captain || false
  const teamRole = currentUser?.role_desc || ''
  const nonCaptainMates = teamMates?.filter(mate => !mate.is_captain) || []
  const teamName = teamInfo?.name

  useEffect(() => {
    if (isTeamLoadingError) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить информацию о команде',
        variant: 'destructive',
      })
    }
  }, [isTeamLoadingError])

  // Обработчик выхода из команды
  const handleTeamLeave = async (event: React.FormEvent) => {
    event.preventDefault()
    leaveTeam(hackathonId, {
      onSuccess: async () =>
        notificationService.success(
          `Вы успешно покинули команду ${teamInfo?.name}`,
        ),
      onError: error =>
        notificationService.error(error, `Ошибка при выходе из команды`),
    })
  }

  // Обработчик исключения участника из команды
  const handleTeamKick = async (
    event: React.FormEvent,
    member: TeamMateRef,
  ) => {
    event.preventDefault()
    kickMate(member, {
      onSuccess: async () =>
        notificationService.success(
          `Участник ${member.user_name} успешно исключен из команды`,
        ),
      onError: error =>
        notificationService.error(error, `Ошибка при исключении участника`),
    })
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
        await queryClient.refetchQueries({ queryKey: ['myTeamInfo'] })
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
    isCaptain,
    teamName,
    teamRole,
    nonCaptainMates,
    isTeamMatesLoading,
    isTeamLoading,
    hasTeam,
    teamInfo,
    teamMates,
    handleTeamLeave,
    handleTeamKick,
    handleChangeCaptain,
  }
}
