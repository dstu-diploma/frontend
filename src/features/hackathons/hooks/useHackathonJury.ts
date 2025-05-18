import { adminApi } from '@/features/admin/api'
import { Judge } from '../model/types'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useToast } from '@/shared/hooks/use-toast'
import { userApi } from '@/features/user/api'
import { JuryFormData } from '../model/schemas'
import { UserPartial } from '@/features/user/model/types'
import { hackathonApi } from '../api'

export const useHackathonJury = (page_id: number) => {
  const { mutate: getJuryList } = hackathonApi.getJuryList()
  const { mutate: addJudge } = adminApi.addJudge()
  const { mutate: deleteJudge } = adminApi.deleteJudge()
  const { mutate: searchByEmail } = userApi.searchByEmail()
  const { mutate: getUsers } = userApi.getUsers()

  const [jury, setJury] = useState<Judge[]>([])
  const [juryInfo, setJuryInfo] = useState<UserPartial[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast, dismiss } = useToast()

  // Загрузка информации о пользователях из списка жюри
  const loadJuryInfo = async (judges: Judge[]) => {
    try {
      setIsLoading(true)
      const judges_id = judges.map(judge => judge.user_id)
      if (judges_id.length === 0) {
        setJuryInfo([])
        return
      }
      getUsers(judges_id, {
        onSuccess: data => {
          setJuryInfo(data)
        },
        onError: error => {
          console.error('Ошибка загрузки информации о членах жюри:', error)
          toast({
            variant: 'destructive',
            title: 'Ошибка при загрузке информации о жюри',
            description: 'Не удалось загрузить информацию о членах жюри',
          })
        },
      })
    } catch (error) {
      console.error('Error in loadJuryInfo:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Загрузка списка жюри
  const loadJury = async () => {
    try {
      setIsLoading(true)
      getJuryList(page_id, {
        onSuccess: async data => {
          setJury(data)
          await loadJuryInfo(data)
        },
        onError: error => {
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const errorData = axiosError.response.data as { detail: string }
            toast({
              variant: 'destructive',
              title: 'Ошибка при получении списка жюри',
              description: errorData.detail,
            })
          }
        },
      })
    } catch (error) {
      console.error('Ошибка при получении списка жюри:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Получение списка жюри при загрузке страницы
  useEffect(() => {
    loadJury()
  }, [page_id])

  const handleJuryAddition = async (data: JuryFormData) => {
    try {
      setIsLoading(true)
      searchByEmail(data.email, {
        onSuccess: data => {
          if (!data.id) {
            toast({
              variant: 'destructive',
              title: 'Ошибка при добавлении судьи в список жюри',
              description: 'Судья не найден',
            })
            return
          }
          const requestBody = {
            hackathon_id: page_id,
            judge_user_id: data.id,
          }
          addJudge(requestBody, {
            onSuccess: async () => {
              dismiss()
              toast({
                variant: 'defaultBlueSuccess',
                description: `Судья ${data.first_name} ${data.last_name} успешно добавлен в список жюри`,
              })
              await loadJury()
            },
            onError: error => {
              dismiss()
              const axiosError = error as AxiosError
              if (axiosError.response) {
                const errorData = axiosError.response.data as { detail: string }
                toast({
                  variant: 'destructive',
                  title: 'Ошибка при добавлении судьи в список жюри',
                  description: errorData.detail,
                })
              }
            },
          })
        },
        onError: error => {
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const errorData = axiosError.response.data as { detail: string }
            toast({
              variant: 'destructive',
              title: 'Ошибка при поиске судьи',
              description: errorData.detail,
            })
          }
        },
      })
    } catch (error) {
      console.error('Ошибка при добавлении члена в состав жюри:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Удаление судьи из списка жюри
  const handleJuryDeletion = async (data: JuryFormData) => {
    try {
      setIsLoading(true)
      searchByEmail(data.email, {
        onSuccess: data => {
          if (!data.id) {
            toast({
              variant: 'destructive',
              title: 'Ошибка при удалении судьи из списка жюри',
              description: 'Судья не найден',
            })
            return
          }
          deleteJudge(
            { hackathon_id: page_id, judge_user_id: data.id },
            {
              onSuccess: async () => {
                dismiss()
                toast({
                  variant: 'defaultBlueSuccess',
                  description: `Судья ${data.first_name} ${data.last_name} успешно удален из списка жюри`,
                })
                await loadJury()
              },
              onError: error => {
                dismiss()
                const axiosError = error as AxiosError
                if (axiosError.response) {
                  const errorData = axiosError.response.data as {
                    detail: string
                  }
                  toast({
                    variant: 'destructive',
                    title: 'Ошибка при удалении судьи из списка жюри',
                    description: errorData.detail,
                  })
                }
              },
            },
          )
        },
        onError: error => {
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const errorData = axiosError.response.data as { detail: string }
            toast({
              variant: 'destructive',
              title: 'Ошибка при поиске судьи',
              description: errorData.detail,
            })
          }
        },
      })
    } catch (error) {
      console.error('Error in handleJuryDeletion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    jury,
    juryInfo,
    isLoading,
    handleJuryAddition,
    handleJuryDeletion,
  }
}
