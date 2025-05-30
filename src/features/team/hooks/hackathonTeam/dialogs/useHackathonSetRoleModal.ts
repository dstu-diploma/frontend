import { useState } from 'react'
import { teamApi } from '../../../api'
import { useQueryClient } from '@tanstack/react-query'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { TeamMateRef } from '../../../model/types'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useHackathonSetRoleModal = (hackathonId: number) => {
  const queryClient = useQueryClient()
  const user = cookiesApi.getUser()
  const teamMates = queryClient.getQueryData(['teamMates']) as
    | TeamMateRef[]
    | undefined
  const currentUserRole =
    teamMates?.find(mate => mate.user_id === user?.id)?.role_desc || ''

  const { mutate: setTeamMateRole } =
    teamApi.useSetHackathonTeamRole(hackathonId)
  const [role, setRole] = useState(currentUserRole)

  const handleMateRoleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRole(e.target.value)
  }

  const handleMateRoleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const requestBody = { role_desc: role }
    setTeamMateRole(requestBody, {
      onSuccess: async () => {
        notificationService.success(`Ваша роль в команде успешно изменена`)
      },
      onError: error =>
        notificationService.error(error, `Ошибка при изменении роли`),
    })
  }

  return {
    role,
    setRole,
    handleMateRoleChange,
    handleMateRoleSave,
  }
}
