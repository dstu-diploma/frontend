import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { requestsApi } from '../api'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useSingleRequest = (requestId: number) => {
  const { data: currentRequest, isLoading: isRequestLoading } =
    requestsApi.useGetRequestById(requestId)
  const { mutate: closeRequest } = requestsApi.useCloseRequest(requestId)
  const { mutate: sendMessage } = requestsApi.useSendMessageInRequest(requestId)

  // Отправка сообщения в обращение
  const handleSendMessage = (messageText: string) => {
    if (!messageText) {
      return
    }
    const requestBody = {
      message: messageText,
    }
    sendMessage(requestBody, {
      onError: error => {
        notificationService.error(error, `Ошибка при отправке сообщения в чат`)
      },
    })
  }

  // Закрытие обращения
  const handleCloseRequest = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      closeRequest(undefined, {
        onError: error => {
          const axiosError = error as AxiosError
          if (axiosError.response?.status === 400) {
            notificationService.errorRaw(
              `Ошибка при закрытии обращения`,
              `Обращение уже закрыто`,
            )
            return
          }
          notificationService.error(error, `Ошибка при закрытии обращения`)
        },
      })
    },
    [closeRequest],
  )

  return {
    currentRequest,
    isRequestLoading,
    handleCloseRequest,
    handleSendMessage,
  }
}
