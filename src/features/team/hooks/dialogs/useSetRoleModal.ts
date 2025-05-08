import { useState, useEffect } from 'react'
import { teamApi } from '../../api'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'

interface useSetRoleModalProps {
  refreshTeamMates: (success_message: string) => Promise<void>
  teamRole: string
}

export const useSetRoleModal = ({
  refreshTeamMates,
  teamRole,
}: useSetRoleModalProps) => {
  const [role, setRole] = useState(teamRole)
  const { mutate: setTeamMateRole } = teamApi.setTeamMateRole()
  const { toast, dismiss } = useToast()

  useEffect(() => {
    setRole(teamRole)
  }, [teamRole])

  const handleMateRoleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value
    setRole(newValue)
  }

  const handleMateRoleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const requestBody = { role_desc: role }
    setTeamMateRole(requestBody, {
      onSuccess: async () => {
        dismiss()
        await refreshTeamMates(`Ваша роль в команде успешно изменена`)
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const data = axiosError.response.data as { detail?: string }
          console.error('Ошибка при изменении роли: ', data.detail)
          dismiss()
          toast({
            variant: 'destructive',
            title: 'Ошибка при изменении роли',
            description: data.detail,
          })
        }
        console.error('Ошибка при изменении роли: ', error)
      },
    })
  }

  return {
    role,
    setRole,
    handleMateRoleChange,
    handleMateRoleSave,
  }
}
