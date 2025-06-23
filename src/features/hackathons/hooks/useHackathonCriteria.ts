import { CriterionFormData, CriterionDeletionData } from '../model/schemas'
import { useEffect } from 'react'
import { hackathonApi } from '../api'
import { notificationService } from '@/shared/lib/services/notification.service'
import { UseFormReturn } from 'react-hook-form'

export const useHackathonCriteria = (page_id: number) => {
  const hackathonId = Number(page_id)

  const { data: criteria, isError: criteriaError } =
    hackathonApi.useGetCriteriaList(hackathonId)
  const { mutate: createCriterion } =
    hackathonApi.useCreateCriterion(hackathonId)
  const { mutate: updateCriterion } =
    hackathonApi.useUpdateCriterion(hackathonId)
  const { mutate: deleteCriterion } =
    hackathonApi.useDeleteCriterion(hackathonId)

  // Вывод тоста в случае ошибки получения списка критериев
  useEffect(() => {
    if (!criteriaError) {
      notificationService.error(
        criteriaError,
        `Ошибка при получении списка критериев`,
      )
    }
  }, [criteriaError])

  // Создание критерия оценивания работы команды
  const handleCriterionCreation = async (
    data: CriterionFormData,
    form: UseFormReturn<{
      name: string
      weight: string
    }>,
  ) => {
    const requestBody = {
      name: data.name,
      weight: Number(data.weight),
    }
    createCriterion(requestBody, {
      onSuccess: () => {
        notificationService.success(
          `Критерий "${requestBody.name}" успешно создан`,
        )
        form.reset()
      },
      onError: error =>
        notificationService.error(error, 'Ошибка при создании критерия'),
    })
  }

  // Обновление критерия оценивания работы команды
  const handleCriterionUpdate = async (
    data: CriterionFormData,
    form: UseFormReturn<CriterionFormData>,
  ) => {
    if (criteria) {
      const criterionId = criteria.find(
        criterion => criterion.name === data.name,
      )?.id

      if (!criterionId) {
        notificationService.errorRaw(
          'Ошибка при обновлении критерия',
          'Критерий не найден',
        )
        return
      }

      const requestBody = {
        criterion_id: criterionId,
        name: data.name,
        weight: Number(data.weight),
      }

      updateCriterion(requestBody, {
        onSuccess: () => {
          notificationService.success(
            `Критерий "${requestBody.name}" успешно обновлен`,
          )
          form.reset()
        },
        onError: error =>
          notificationService.error(error, `Ошибка при обновлении критерия`),
      })
    }
  }

  // Удаление критерия оценивания работы команды
  const handleCriterionDeletion = async (
    data: CriterionDeletionData,
    form: UseFormReturn<CriterionDeletionData>,
  ) => {
    if (criteria) {
      const criterionId = criteria.find(
        criterion => criterion.name === data.name,
      )?.id

      if (!criterionId) {
        notificationService.errorRaw(
          'Ошибка при удалении критерия',
          'Критерий не найден',
        )
        return
      }

      deleteCriterion(
        { criterion_id: criterionId },
        {
          onSuccess: () => {
            notificationService.success(
              `Критерий "${data.name}" успешно удален`,
            )
            form.reset()
          },
          onError: error => {
            notificationService.error(error, `Ошибка при удалении критерия`)
          },
        },
      )
    }
  }

  return {
    criteria,
    handleCriterionCreation,
    handleCriterionUpdate,
    handleCriterionDeletion,
  }
}
