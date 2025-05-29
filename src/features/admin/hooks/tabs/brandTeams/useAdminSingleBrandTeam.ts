import { adminApi } from '@/features/admin/api'
import { TeamInfo } from '@/features/team'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useAdminSingleBrandTeam = (teamInfo: TeamInfo) => {
  const { mutate: deleteBrandTeam } = adminApi.useDeleteBrandTeam(teamInfo.id)

  const handleDeleteBrandTeam = () => {
    deleteBrandTeam(undefined, {
      onSuccess: () => {
        notificationService.success(
          `Команда-бренд «${teamInfo.name}» успешно удалена`,
        )
      },
      onError: error => {
        notificationService.error(error, `Ошибка при удалении команды-бренда`)
      },
    })
  }

  return {
    handleDeleteBrandTeam,
  }
}
