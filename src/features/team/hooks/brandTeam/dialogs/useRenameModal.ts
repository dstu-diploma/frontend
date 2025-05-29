import { teamApi } from '../../../api'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { TeamInfo } from '../../../model/types'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useRenameModal = () => {
  const queryClient = useQueryClient()
  const teamInfo = queryClient.getQueryData(['myTeamInfo']) as
    | TeamInfo
    | undefined
  const { mutate: renameTeam } = teamApi.useRenameTeam()
  const [teamName, setTeamName] = useState(teamInfo?.name)

  const handleTeamNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTeamName(e.target.value)
  }

  const handleTeamRename = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName) {
      return
    }
    renameTeam(
      { name: teamName },
      {
        onSuccess: async () =>
          notificationService.success('Название команды изменено'),
        onError: error =>
          notificationService.error(error, 'Ошибка при переименовании команды'),
      },
    )
  }

  return {
    currentTeamName: teamName,
    setTeamName,
    handleTeamRename,
    handleTeamNameChange,
  }
}
