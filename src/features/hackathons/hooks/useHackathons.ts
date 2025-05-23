'use client'

import { useCustomToast } from '@/shared/lib/helpers/toast'
import { hackathonApi } from '../api'
import { useEffect } from 'react'

export const useHackathons = () => {
  const { showToastError } = useCustomToast()
  const {
    data: allHackathons,
    isPending: isHackathonsLoading,
    isError: isHackathonsError,
    error,
  } = hackathonApi.useGetHackathonList()

  useEffect(() => {
    if (isHackathonsError) {
      showToastError(error, `Ошибка при получении списка хакатонов`)
    }
  })

  return {
    isHackathonsLoading,
    allHackathons,
  }
}
