import axiosInstance from '@/shared/api/axios'
import { useMutation } from '@tanstack/react-query'
import { CHAT_SERVICE_API_URL } from '@/shared/api/basePaths'
import {
  CreatedRequest,
  Request,
  RequestMessage,
  RequestWithMessages,
} from '../model/types'

export const requestsApi = {
  getAllRequests: () => {
    return useMutation({
      mutationFn: async (): Promise<Request[]> => {
        const response = await axiosInstance.get(`${CHAT_SERVICE_API_URL}/`)
        return response.data
      },
    })
  },
  createRequest: () => {
    return useMutation({
      mutationFn: async ({
        message,
        subject,
      }: CreatedRequest): Promise<CreatedRequest> => {
        const response = await axiosInstance.put(`${CHAT_SERVICE_API_URL}/`, {
          message,
          subject,
        })
        return response.data
      },
    })
  },
  getRequestById: () => {
    return useMutation({
      mutationFn: async (request_id: number): Promise<RequestWithMessages> => {
        const response = await axiosInstance.get(
          `${CHAT_SERVICE_API_URL}/${request_id}`,
        )
        return response.data
      },
    })
  },
  sendMessageInRequest: () => {
    return useMutation({
      mutationFn: async ({
        request_id,
        message,
      }: {
        request_id: number
        message: string
      }): Promise<RequestMessage> => {
        const response = await axiosInstance.put(
          `${CHAT_SERVICE_API_URL}/${request_id}`,
          { message },
        )
        return response.data
      },
    })
  },
  closeRequest: () => {
    return useMutation({
      mutationFn: async (request_id: number): Promise<Request> => {
        const response = await axiosInstance.delete(
          `${CHAT_SERVICE_API_URL}/${request_id}`,
        )
        return response.data
      },
    })
  },
}
