import { useState } from 'react'
import { teamApi } from '../../api'
import { useQueryClient } from '@tanstack/react-query'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { TeamMateRef } from '../../model/types'
import { useCustomToast } from '@/shared/lib/helpers/toast'

export const useSetRoleModal = () => {
  const { showToastSuccess, showToastError } = useCustomToast()
  const queryClient = useQueryClient()
  const user = cookiesApi.getUser()
  const teamMates = queryClient.getQueryData(['teamMates']) as
    | TeamMateRef[]
    | undefined
  const currentUserRole =
    teamMates?.find(mate => mate.user_id === user?.id)?.role_desc || ''

  const { mutate: setTeamMateRole } = teamApi.useSetTeamMateRole()
  const [role, setRole] = useState(currentUserRole)

  const handleMateRoleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRole(e.target.value)
  }

  const handleMateRoleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setTeamMateRole(role, {
      onSuccess: async () => {
        showToastSuccess(`Ваша роль в команде успешно изменена`)
      },
      onError: error => showToastError(error, `Ошибка при изменении роли`),
    })
  }

  return {
    role,
    setRole,
    handleMateRoleChange,
    handleMateRoleSave,
  }
}
