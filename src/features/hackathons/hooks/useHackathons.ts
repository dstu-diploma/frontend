import { notificationService } from '@/shared/lib/services/notification.service'
import { hackathonApi } from '../api'
import { useEffect } from 'react'

export const useHackathons = () => {
  const {
    data: allHackathons,
    isPending: isHackathonsLoading,
    isError: isHackathonsError,
    error,
  } = hackathonApi.useGetHackathonList()

  useEffect(() => {
    if (isHackathonsError) {
      notificationService.error(error, `Ошибка при получении списка хакатонов`)
    }
  })

  return {
    isHackathonsLoading,
    allHackathons,
  }
}
