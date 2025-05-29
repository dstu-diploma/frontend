import { notificationService } from '@/shared/lib/services/notification.service'
import { teamApi } from '../../api'

export const useInvites = () => {
  // Список приглашений в команды

  const { data: teamInvites, isPending: isTeamInvitesLoading } =
    teamApi.useGetUserInvites()

  // Мутации для принятия/отклонения приглашений
  const { mutate: acceptInvite } = teamApi.useAcceptInvite()
  const { mutate: denyInvite } = teamApi.useDenyInvite()

  // Обработчик принятия приглашения
  const handleAcceptInvite = (team_id: number) => {
    acceptInvite(team_id, {
      onSuccess: async () =>
        notificationService.success(`Приглашение успешно в команду принято`),
      onError: error =>
        notificationService.error(error, `Ошибка при принятии приглашения`),
    })
  }

  // Обработчик отклонения приглашения
  const handleDenyInvite = async (team_id: number) => {
    denyInvite(team_id, {
      onSuccess: async () =>
        notificationService.success(
          `Приглашение на участие в команде отклонено`,
        ),
      onError: error =>
        notificationService.error(error, `Ошибка при отклонении приглашения`),
    })
  }

  return {
    teamInvites,
    isTeamInvitesLoading,
    handleAcceptInvite,
    handleDenyInvite,
  }
}
