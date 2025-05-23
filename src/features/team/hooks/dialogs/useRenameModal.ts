import { teamApi } from '../../api'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { TeamInfo } from '../../model/types'
import { useCustomToast } from '@/shared/lib/helpers/toast'

export const useRenameModal = () => {
  const { showToastSuccess, showToastError } = useCustomToast()
  const queryClient = useQueryClient()
  const teamInfo = queryClient.getQueryData(['myTeamInfo']) as
    | TeamInfo
    | undefined
  const currentTeamName = teamInfo?.name
  const { mutate: renameTeam } = teamApi.useRenameTeam()
  const [teamName, setTeamName] = useState(currentTeamName)

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
        onSuccess: async () => showToastSuccess('Название команды изменено'),
        onError: error =>
          showToastError(error, 'Ошибка при переименовании команды'),
      },
    )
  }

  return {
    teamName,
    setTeamName,
    handleTeamRename,
    handleTeamNameChange,
  }
}
