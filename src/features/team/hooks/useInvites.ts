import { useCustomToast } from '@/shared/lib/helpers/toast'
import { teamApi } from '../api'

export const useInvites = () => {
  // Список приглашений в команды
  const { showToastSuccess, showToastError } = useCustomToast()
  const { data: teamInvites, isPending: isTeamInvitesLoading } =
    teamApi.useGetUserInvites()

  // Мутации для принятия/отклонения приглашений
  const { mutate: acceptInvite } = teamApi.useAcceptInvite()
  const { mutate: denyInvite } = teamApi.useDenyInvite()

  // Обработчик принятия приглашения
  const handleAcceptInvite = (team_id: number) => {
    acceptInvite(team_id, {
      onSuccess: async () =>
        showToastSuccess(`Приглашение успешно в команду принято`),
      onError: error =>
        showToastError(error, `Ошибка при принятии приглашения`),
    })
  }

  // Обработчик отклонения приглашения
  const handleDenyInvite = async (team_id: number) => {
    denyInvite(team_id, {
      onSuccess: async () =>
        showToastSuccess(`Приглашение на участие в команде отклонено`),
      onError: error =>
        showToastError(error, `Ошибка при отклонении приглашения`),
    })
  }

  return {
    teamInvites,
    isTeamInvitesLoading,
    handleAcceptInvite,
    handleDenyInvite,
  }
}
