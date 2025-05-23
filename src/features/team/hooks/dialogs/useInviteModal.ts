import { teamApi } from '../../api'
import { useState } from 'react'
import { userApi } from '@/features/user'
import { UserByEmail } from '@/features/user/model/types'
import { useCustomToast } from '@/shared/lib/helpers/toast'

export const useInviteModal = () => {
  const { showToastSuccess, showToastError } = useCustomToast()
  const [mateEmail, setMateEmail] = useState('')
  const { mutate: searchByEmail } = userApi.useSearchByEmail()
  const { mutate: sendInvite } = teamApi.useSendInvite()

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
    sendInvite(user_id, {
      onSuccess: () =>
        showToastSuccess(
          `Заявка отправлена пользователю ${first_name} ${last_name}`,
        ),
      onError: (error: Error) =>
        showToastError(error, `Ошибка отправки приглашения`),
    })
  }

  const handleTeamInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    searchByEmail(mateEmail, {
      onSuccess: (data: UserByEmail) => {
        sendInvintation(data.id, data.first_name, data.last_name)
      },
      onError: error => {
        showToastError(error, `Ошибка при поиске участника`)
      },
    })
  }

  return {
    mateEmail,
    setMateEmail,
    handleTeamInviteChange,
    handleTeamInvite,
  }
}
