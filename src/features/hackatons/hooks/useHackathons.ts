import { useEffect, useState } from 'react'
import { Hackathon } from '../model/types'
import { hackathonApi } from '../api'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'

export const useHackathons = () => {
  const { mutate: getHackathonsList, isPending: isHackathonsLoading } =
    hackathonApi.getHackathonsList()
  const [allHackathons, setAllHackathons] = useState<Hackathon[]>([])
  const { toast, dismiss } = useToast()

  const getAllHackathons = () => {
    getHackathonsList(undefined, {
      onSuccess: data => {
        setAllHackathons(data)
      },
      onError: error => {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при получении списка хакатонов',
            description: errorData.detail,
          })
          console.error(
            'Ошибка при получении списка хакатонов:',
            errorData.detail,
          )
        }
      },
    })
  }

  useEffect(() => {
    getAllHackathons()
  }, [])

  return {
    isHackathonsLoading,
    allHackathons,
  }
}
