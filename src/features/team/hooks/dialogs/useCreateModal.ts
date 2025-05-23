import { teamApi } from '../../api'
import { useState } from 'react'
import { useCustomToast } from '@/shared/lib/helpers/toast'

export const useCreateModal = () => {
  const { showToastSuccess, showToastError } = useCustomToast()

  const [newTeamName, setNewTeamName] = useState('')
  const { mutate: createTeam } = teamApi.useCreateTeam()

  const handleTeamCreateChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTeamName(e.target.value)
  }

  const handleTeamCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTeamName) {
      return
    }
    const requestBody = { name: newTeamName }
    createTeam(requestBody, {
      onSuccess: async () =>
        showToastSuccess(`Команда ${newTeamName} успешно создана`),
      onError: error => showToastError(error, `Ошибка при создании команды`),
    })
  }

  return {
    setNewTeamName,
    newTeamName,
    handleTeamCreateChange,
    handleTeamCreate,
  }
}
