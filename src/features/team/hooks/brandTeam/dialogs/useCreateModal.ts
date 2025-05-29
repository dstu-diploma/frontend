import { notificationService } from '@/shared/lib/services/notification.service'
import { teamApi } from '../../../api'
import { useState } from 'react'

export const useCreateModal = () => {
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
        notificationService.success(`Команда ${newTeamName} успешно создана`),
      onError: error =>
        notificationService.error(error, `Ошибка при создании команды`),
    })
  }

  return {
    setNewTeamName,
    newTeamName,
    handleTeamCreateChange,
    handleTeamCreate,
  }
}
