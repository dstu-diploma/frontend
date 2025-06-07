import { adminApi } from '@/features/admin/api'
import { TeamInfo } from '@/features/team'
import { userApi } from '@/features/user'
import { UserByEmail } from '@/features/user/model/types'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useState } from 'react'

export const useAdminSingleBrandTeam = (teamInfo?: TeamInfo) => {
  const { mutate: searchByEmail } = userApi.useSearchByEmail()
  const { mutate: deleteBrandTeam } = adminApi.useDeleteBrandTeam(
    teamInfo?.id ?? 0,
  )
  const { mutate: renameBrandTeam } = adminApi.useChangeBrandTeamName()
  const { mutate: setCaptainRights } = adminApi.useChangeBrandTeamCaptainRights(
    teamInfo?.id ?? 0,
  )
  const [currentBrandTeamName, setNewBrandTeamName] = useState(
    teamInfo?.name ?? '',
  )
  const [currentNewCaptain, setCurrentNewCaptain] = useState('')

  const handleDeleteTeam = () => {
    if (!teamInfo) return

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

  const handleBrandTeamNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewBrandTeamName(e.target.value)
  }

  const handleBrandTeamRename = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentBrandTeamName || !teamInfo) {
      return
    }
    renameBrandTeam(
      { team_id: teamInfo.id, new_name: currentBrandTeamName },
      {
        onSuccess: async () =>
          notificationService.success('Название команды изменено'),
        onError: error =>
          notificationService.error(error, 'Ошибка при переименовании команды'),
      },
    )
  }

  const handleNewCaptainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNewCaptain(e.target.value)
  }

  const setCaptain = async (user_id: number, is_captain: boolean) => {
    if (!teamInfo) return

    setCaptainRights(
      { user_id, is_captain: !is_captain },
      {
        onSuccess: () =>
          notificationService.success(`У участника изменены права капитана`),
        onError: (error: Error) =>
          notificationService.error(
            error,
            `Ошибка установка прав капитана команды`,
          ),
      },
    )
  }

  const handleChangeCaptainRights = async (
    e: React.FormEvent,
    isCaptain: boolean,
  ) => {
    e.preventDefault()
    if (!currentNewCaptain || !teamInfo) {
      return
    }
    searchByEmail(currentNewCaptain, {
      onSuccess: (data: UserByEmail) => {
        setCaptain(data.id, isCaptain)
      },
      onError: error => {
        notificationService.error(error, `Ошибка при поиске пользователя`)
      },
    })
  }

  return {
    currentBrandTeamName,
    setNewBrandTeamName,
    currentNewCaptain,
    setCurrentNewCaptain,
    handleDeleteTeam,
    handleBrandTeamRename,
    handleBrandTeamNameChange,
    handleNewCaptainChange,
    handleChangeCaptainRights,
  }
}
