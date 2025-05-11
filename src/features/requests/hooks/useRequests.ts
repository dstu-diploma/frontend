import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import { requestsApi } from '../api'
import { CreateRequestFormData } from '../model/schemas'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Request } from '../model/types'

export const useRequests = () => {
  const { mutate: getAllRequests } = requestsApi.getAllRequests()
  const { mutate: createRequest } = requestsApi.createRequest()
  const { mutate: closeRequest } = requestsApi.closeRequest()
  const { mutate: getRequestById } = requestsApi.getRequestById()

  const [requests, setRequests] = useState<Request[]>([])
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null)
  const [isCurrentRequestLoaded, setIsCurrentRequestLoaded] = useState(false)
  const loadingRequestId = useRef<number | null>(null)
  const initialLoadDone = useRef(false)
  const { toast, dismiss } = useToast()

  // Функция для загрузки всех обращений
  const loadRequests = useCallback(async () => {
    getAllRequests(undefined, {
      onSuccess: data => {
        setRequests(data)
        initialLoadDone.current = true
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при загрузки обращений',
            description: errorData.detail,
          })
          console.error('Ошибка при загрузке обращений:', errorData)
        }
      },
    })
  }, [getAllRequests, dismiss, toast])

  // Функция для загрузки обращения по id
  const loadRequestById = useCallback(
    async (requestId: number) => {
      getRequestById(requestId, {
        onSuccess: data => {
          setCurrentRequest(data)
          setIsCurrentRequestLoaded(true)
          loadingRequestId.current = null
        },
        onError: error => {
          console.error('Error loading request:', requestId, error)
          dismiss()
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const errorData = axiosError.response.data as { detail: string }
            toast({
              variant: 'destructive',
              title: 'Ошибка при получении данных о текущем обращении',
              description: errorData.detail,
            })
            console.error(
              'Ошибка при получении данных о текущем обращении:',
              errorData,
            )
          }
          setIsCurrentRequestLoaded(false)
          loadingRequestId.current = null
        },
      })
    },
    [getRequestById, dismiss, toast, isCurrentRequestLoaded, currentRequest],
  )

  useEffect(() => {
    loadRequests()
  }, [])

  // Создание обращения
  const handleCreateRequest = useCallback(
    (data: CreateRequestFormData) => {
      const requestBody = {
        message: data.message,
        subject: data.subject,
      }
      createRequest(requestBody, {
        onSuccess: () => {
          dismiss()
          toast({
            variant: 'defaultBlueSuccess',
            description: `Обращение успешно создано`,
          })
          loadRequests()
        },
        onError: error => {
          dismiss()
          const axiosError = error as AxiosError
          if (axiosError.response) {
            const errorData = axiosError.response.data as { detail: string }
            toast({
              variant: 'destructive',
              title: 'Ошибка при создании обращения',
              description: errorData.detail,
            })
            console.error('Ошибка при создании обращения:', errorData)
          }
        },
      })
    },
    [createRequest, dismiss, toast, loadRequests],
  )

  // Закрытие обращения
  const handleCloseRequest = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, requestId: number) => {
      e.preventDefault()
      closeRequest(requestId, {
        onSuccess: () => {
          dismiss()
          toast({
            variant: 'defaultBlueSuccess',
            description: `Обращение успешно закрыто`,
          })
          loadRequests()
        },
        onError: error => {
          dismiss()
          const axiosError = error as AxiosError
          if (axiosError.response?.status === 400) {
            toast({
              variant: 'destructive',
              description: 'Обращение уже закрыто',
            })
            return
          }
          if (axiosError.response) {
            const errorData = axiosError.response.data as { detail: string }
            toast({
              variant: 'destructive',
              title: 'Ошибка при закрытии обращения',
              description: errorData.detail,
            })
            console.error('Ошибка при закрытии обращения:', errorData)
          }
        },
      })
    },
    [closeRequest, dismiss, toast, loadRequests],
  )

  return {
    requests,
    currentRequest,
    isCurrentRequestLoaded,
    loadRequestById,
    handleCreateRequest,
    handleCloseRequest,
  }
}
