import { Judge } from '../model/types'
import { useEffect, useState } from 'react'
import { userApi } from '@/features/user/api'
import { JuryFormData } from '../model/schemas'
import { hackathonApi } from '../api'
import { useCustomToast } from '@/shared/lib/helpers/toast'

export const useHackathonJury = (page_id: number) => {
  const { showToastError, showToastSuccess, showRawToastError } =
    useCustomToast()
  const hackathonId = Number(page_id)

  const { data: jury, error: juryLoadError } =
    hackathonApi.useGetJuryList(hackathonId)
  const judges_ids = jury?.map((judge: Judge) => judge.user_id) || []
  const { data: juryInfo } = userApi.useGetUsers(judges_ids)

  const { mutate: addJudge } = hackathonApi.useAddJudge(hackathonId)
  const { mutate: deleteJudge } = hackathonApi.useDeleteJudge(hackathonId)
  const { mutate: searchByEmail } = userApi.useSearchByEmail()

  const [isLoading, setIsLoading] = useState(false)

  // Вывод ошибок при получении списка жюри
  useEffect(() => {
    if (juryLoadError) {
      showToastError(juryLoadError, `Ошибка при получении списка жюри`)
    }
  }, [juryLoadError])

  // Добавление судьи в список жюри
  const handleJuryAddition = async (data: JuryFormData) => {
    try {
      setIsLoading(true)
      searchByEmail(data.email, {
        onSuccess: data => {
          if (!data.id) {
            showRawToastError(
              'Ошибка при добавлении судьи в список жюри',
              'Судья не найден',
            )
            return
          }
          const requestBody = {
            judge_user_id: data.id,
          }
          addJudge(requestBody, {
            onSuccess: async () =>
              showToastSuccess(
                `Судья ${data.first_name} ${data.last_name} успешно добавлен в список жюри`,
              ),
            onError: error =>
              showToastError(
                error,
                `Ошибка при добавлении судьи в список жюри`,
              ),
          })
        },
        onError: error => showToastError(error, 'Ошибка при поиске судьи'),
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
            showRawToastError(
              'Ошибка при удалении судьи из списка жюри',
              'Судья не найден',
            )
            return
          }
          deleteJudge(
            { judge_user_id: data.id },
            {
              onSuccess: async () => {
                showToastSuccess(
                  `Судья ${data.first_name} ${data.last_name} успешно удален из состава жюри`,
                )
              },
              onError: error => {
                showToastError(
                  error,
                  'Ошибка при удалении судьи из состава жюри',
                )
              },
            },
          )
        },
        onError: error => {
          showToastError(error, 'Ошибка при поиске судьи')
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
