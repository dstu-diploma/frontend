import axiosInstance from '@/shared/api/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CHAT_SERVICE_API_URL } from '@/shared/api/basePaths'
import {
  CreateRequestBody,
  MinimalRequestData,
  Request,
  RequestMessage,
} from '../model/types'

export const requestsApi = {
  useGetAllRequests: () => {
    return useQuery<MinimalRequestData[]>({
      queryKey: ['allRequests'],
      queryFn: async () => {
        const response = await axiosInstance.get(`${CHAT_SERVICE_API_URL}/`)
        return response.data
      },
    })
  },
  useGetRequestById: (requestId: number) => {
    return useQuery({
      queryKey: ['request', requestId],
      queryFn: async (): Promise<Request> => {
        const response = await axiosInstance.get(
          `${CHAT_SERVICE_API_URL}/${requestId}`,
        )
        return response.data
      },
    })
  },
  useCreateRequest: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        message,
        subject,
      }: CreateRequestBody): Promise<CreatedRequest> => {
        const response = await axiosInstance.put(`${CHAT_SERVICE_API_URL}/`, {
          hackathon_id,
          message,
          subject,
        })
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allRequests'] })
      },
      retry: false,
      mutationKey: ['createRequest'],
      onMutate: async () => {
        // Отменяем все исходящие запросы
        await queryClient.cancelQueries({ queryKey: ['allRequests'] })
      },
    })
  },
  useSendMessageInRequest: (request_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        message,
      }: {
        message: string
      }): Promise<RequestMessage> => {
        const response = await axiosInstance.put(
          `${CHAT_SERVICE_API_URL}/${request_id}`,
          { message },
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['request', request_id] })
      },
    })
  },
  useCloseRequest: (request_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (): Promise<Request> => {
        const response = await axiosInstance.delete(
          `${CHAT_SERVICE_API_URL}/${request_id}`,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['request', request_id] })
      },
    })
  },
}
