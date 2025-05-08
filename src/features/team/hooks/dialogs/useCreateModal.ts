import { useToast } from '@/shared/hooks/use-toast'
import { teamApi } from '../../api'
import { useState } from 'react'
import { AxiosError } from 'axios'

interface useCreateModalProps {
  refreshTeamInfo: (success_message: string) => Promise<void>
}

export const useCreateModal = ({ refreshTeamInfo }: useCreateModalProps) => {
  const [newTeamName, setNewTeamName] = useState('')
  const { mutate: createTeam } = teamApi.createTeam()
  const { toast, dismiss } = useToast()

  const handleTeamCreateChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value
    setNewTeamName(newValue)
  }

  const handleTeamCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const requestBody = { name: newTeamName }
    createTeam(requestBody, {
      onSuccess: async () => {
        dismiss()
        await refreshTeamInfo(`Команда ${newTeamName} успешно создана`)
      },
      onError: error => {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error('Ошибка при создании команды: ', data.detail)
          dismiss()
          toast({
            variant: 'destructive',
            title: 'Ошибка при создании команды',
            description: data.detail,
          })
        }
      },
    })
  }

  return {
    setNewTeamName,
    newTeamName,
    handleTeamCreateChange,
    handleTeamCreate,
  }
}
