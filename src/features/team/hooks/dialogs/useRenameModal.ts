import { useToast } from '@/shared/hooks/use-toast'
import { teamApi } from '../../api'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

interface useRenameModalProps {
  teamInfoName: string
  refreshTeamName: () => Promise<void>
}

export const useRenameModal = ({
  teamInfoName,
  refreshTeamName,
}: useRenameModalProps) => {
  const { mutate: renameTeam } = teamApi.renameTeam()
  const { toast, dismiss } = useToast()
  const [teamName, setTeamName] = useState(teamInfoName)

  useEffect(() => {
    setTeamName(teamInfoName)
  }, [teamInfoName])

  const handleTeamNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value
    setTeamName(newValue)
  }

  const handleTeamRename = async (e: React.FormEvent) => {
    e.preventDefault()
    const requestBody = { name: teamName }
    renameTeam(requestBody, {
      onSuccess: async () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: 'Название команды изменено',
        })
        await refreshTeamName()
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error('Ошибка при переименовании команды: ', data.detail)
          dismiss()
          toast({
            variant: 'destructive',
            title: 'Ошибка при переименовании команды',
            description: data.detail,
          })
        }
        console.error('Ошибка при переименовании команды: ', error)
      },
    })
  }

  return {
    teamName,
    setTeamName,
    handleTeamRename,
    handleTeamNameChange,
  }
}
