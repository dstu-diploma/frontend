import { notificationService } from '@/shared/lib/services/notification.service'
import { requestsApi } from '../api'
import { CreateRequestFormData } from '../model/schemas'
import { useEffect, useCallback, useMemo } from 'react'

export const useRequests = () => {
  const {
    data: allRequests,
    isSuccess: isAllRequestsLoaded,
    isError: isRequestsLoadError,
    isLoading: isRequestsLoading,
    error: requestsLoadError,
  } = requestsApi.useGetAllRequests()
  const { mutate: createRequest } = requestsApi.useCreateRequest()

  // Типа обращений
  const closedRequests = useMemo(() => {
    return allRequests?.filter(request => request.closed_by_user_id)
  }, [allRequests])
  const openedRequests = useMemo(() => {
    return allRequests?.filter(request => !request.closed_by_user_id)
  }, [allRequests])

  // Функция для загрузки всех обращений
  useEffect(() => {
    if (isRequestsLoadError) {
      notificationService.error(
        requestsLoadError,
        'Ошибка при загрузке обращений',
      )
    }
  }, [allRequests, isRequestsLoadError, requestsLoadError])

  // Создание обращения
  const handleCreateRequest = useCallback(
    (data: CreateRequestFormData) => {
      const requestBody = {
        hackathon_id: Number(data.hackathon_id),
        message: data.message,
        subject: data.subject,
      }
      createRequest(requestBody, {
        onError: error => {
          notificationService.error(error, 'Ошибка при создании обращения')
        },
      })
    },
    [createRequest],
  )

  return {
    closedRequests,
    openedRequests,
    isRequestsLoading,
    isAllRequestsLoaded,
    handleCreateRequest,
  }
}
