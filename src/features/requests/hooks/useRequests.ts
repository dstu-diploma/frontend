import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import { requestsApi } from '../api'
import { CreateRequestFormData } from '../model/schemas'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Request } from '../model/types'

export const useRequests = () => {
  const { mutate: getAllRequests, isPending: isLoadingRequests } =
    requestsApi.getAllRequests()
  const { mutate: createRequest } = requestsApi.createRequest()
  const { mutate: closeRequest } = requestsApi.closeRequest()
  const { mutate: getRequestById } = requestsApi.getRequestById()

  const [requests, setRequests] = useState<Request[]>([])
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null)
  const [isCurrentRequestLoaded, setIsCurrentRequestLoaded] = useState(false)
  const [isAllRequestsLoaded, setIsAllRequestsLoaded] = useState(false)
  const [loadingRequestIds, setLoadingRequestIds] = useState<Set<number>>(
    new Set(),
  )
  const initialLoadDone = useRef(false)
  const { toast, dismiss } = useToast()

  // Функция для загрузки всех обращений
  const loadRequests = useCallback(async () => {
    setIsAllRequestsLoaded(false)
    getAllRequests(undefined, {
      onSuccess: data => {
        setRequests(data)
        initialLoadDone.current = true
        setIsAllRequestsLoaded(true)
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
        setIsAllRequestsLoaded(false)
      },
    })
  }, [getAllRequests, dismiss, toast])

  // Функция для загрузки обращения по id
  const loadRequestById = useCallback(
    async (requestId: number) => {
      setLoadingRequestIds(prev => new Set(prev).add(requestId))
      getRequestById(requestId, {
        onSuccess: data => {
          setCurrentRequest(data)
          setIsCurrentRequestLoaded(true)
          setLoadingRequestIds(prev => {
            const newSet = new Set(prev)
            newSet.delete(requestId)
            return newSet
          })
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
          setLoadingRequestIds(prev => {
            const newSet = new Set(prev)
            newSet.delete(requestId)
            return newSet
          })
        },
      })
    },
    [getRequestById, dismiss, toast],
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
    isLoadingRequests,
    isAllRequestsLoaded,
    currentRequest,
    isCurrentRequestLoaded,
    loadingRequestIds,
    loadRequestById,
    handleCreateRequest,
    handleCloseRequest,
  }
}
