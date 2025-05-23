import { CriterionFormData } from '../model/schemas'
import { useEffect } from 'react'
import { useCustomToast } from '@/shared/lib/helpers/toast'
import { hackathonApi } from '../api'

export const useHackathonCriteria = (page_id: number) => {
  const hackathonId = Number(page_id)
  const { showToastSuccess, showToastError, showRawToastError } =
    useCustomToast()

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
      showToastError(criteriaError, `Ошибка при получении списка критериев`)
    }
  }, [criteriaError])

  // Создание критерия оценивания работы команды
  const handleCriterionCreation = async (data: CriterionFormData) => {
    const requestBody = {
      name: data.name,
      weight: data.weight,
    }
    createCriterion(requestBody, {
      onSuccess: () =>
        showToastSuccess(`Критерий "${requestBody.name}" успешно создан`),
      onError: error => showToastError(error, 'Ошибка при создании критерия'),
    })
  }

  // Обновление критерия оценивания работы команды
  const handleCriterionUpdate = async (data: CriterionFormData) => {
    if (criteria) {
      const criterionId = criteria.find(
        criterion => criterion.name === data.name,
      )?.id

      if (!criterionId) {
        showRawToastError(
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
        onSuccess: () =>
          showToastSuccess(`Критерий "${requestBody.name}" успешно обновлен`),
        onError: error =>
          showToastError(error, `Ошибка при обновлении критерия`),
      })
    }
  }

  // Удаление критерия оценивания работы команды
  const handleCriterionDeletion = async (data: CriterionFormData) => {
    if (criteria) {
      const criterionId = criteria.find(
        criterion => criterion.name === data.name,
      )?.id

      if (!criterionId) {
        showRawToastError('Ошибка при удалении критерия', 'Критерий не найден')
        return
      }

      deleteCriterion(
        { criterion_id: criterionId },
        {
          onSuccess: () =>
            showToastSuccess(`Критерий "${data.name}" успешно удален`),
          onError: error =>
            showToastError(error, `Ошибка при удалении критерия`),
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
