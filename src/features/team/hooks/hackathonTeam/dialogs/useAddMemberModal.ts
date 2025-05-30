import { teamApi } from '../../../api'
import { useState } from 'react'
import { userApi } from '@/features/user'
import { UserByEmail } from '@/features/user/model/types'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useAddMemberModal = (hackathonId: number) => {
  const [mateEmail, setMateEmail] = useState('')
  const { mutate: searchByEmail } = userApi.useSearchByEmail()
  const { mutate: addMember } = teamApi.useAddHackathonTeamMate(hackathonId)

  const handleTeamInviteChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMateEmail(e.target.value)
  }

  const sendInvintation = async (
    user_id: number,
    first_name: string,
    last_name: string,
  ) => {
    addMember(
      { mate_id: user_id },
      {
        onSuccess: () =>
          notificationService.success(
            `Пользователь ${first_name} ${last_name} добавлен в команду`,
          ),
        onError: (error: Error) =>
          notificationService.error(error, `Ошибка при добавлении участника`),
      },
    )
  }

  const handleHackathonTeamAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    searchByEmail(mateEmail, {
      onSuccess: (data: UserByEmail) => {
        sendInvintation(data.id, data.first_name, data.last_name)
      },
      onError: error => {
        notificationService.error(error, `Ошибка при поиске участника`)
      },
    })
  }

  return {
    mateEmail,
    setMateEmail,
    handleTeamInviteChange,
    handleHackathonTeamAdd,
  }
}
