import { adminApi } from '@/features/admin/api'
import { toast, useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import { CriterionFormData } from '../model/schemas'
import { Criterion } from '../model/types'
import { useEffect, useState } from 'react'

export const useHackathonCriteria = (page_id: number) => {
  const { mutate: createCriterion } = adminApi.createCriterion()
  const { mutate: updateCriterion } = adminApi.updateCriterion()
  const { mutate: getCriteriaList } = adminApi.getCriteriaList()
  const [criteria, setCriteria] = useState<Criterion[]>([])
  const { toast, dismiss } = useToast()

  // Получение текущего списка критериев оценивания работы команды
  useEffect(() => {
    getCriteriaList(page_id, {
      onSuccess: data => setCriteria(data),
    })
  }, [page_id])

  // Создание критерия оценивания работы команды
  const handleCriterionCreation = async (data: CriterionFormData) => {
    const requestBody = {
      hackathon_id: Number(page_id),
      name: data.name,
      weight: data.weight,
    }
    createCriterion(requestBody, {
      onSuccess: () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: `Критерий "${requestBody.name}" успешно создан`,
        })
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при создании критерия',
            description: errorData.detail,
          })
          console.error('Ошибка при создании критерия:', errorData)
        }
      },
    })
  }

  // Обновление критерия оценивания работы команды
  const handleCriterionUpdate = async (data: CriterionFormData) => {
    const criterionId = criteria.find(
      criterion => criterion.name === data.name,
    )?.id

    if (!criterionId) {
      toast({
        variant: 'destructive',
        title: 'Ошибка при обновлении критерия',
        description: 'Критерий не найден',
      })
      return
    }

    const requestBody = {
      hackathon_id: Number(page_id),
      criterion_id: criterionId,
      name: data.name,
      weight: Number(data.weight),
    }

    updateCriterion(requestBody, {
      onSuccess: () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: `Критерий "${requestBody.name}" успешно обновлен`,
        })
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при обновлении критерия',
            description: errorData.detail,
          })
          console.error('Ошибка при обновлении критерия:', errorData)
        }
      },
    })
  }

  return {
    handleCriterionCreation,
    handleCriterionUpdate,
  }
}
