import axiosInstance from '@/shared/api/axios'
import { USER_SERVICE_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'
import {
  RegisterRequestBody,
  AuthResponseBody,
  LoginRequestBody,
  UserPartial,
} from '../model/types'

console.log(USER_SERVICE_API_URL)

export const userBaseApi = {
  register: () => {
    return useMutation({
      mutationFn: async (
        data: RegisterRequestBody,
      ): Promise<AuthResponseBody> => {
        const response = await axiosInstance.post(
          `${USER_SERVICE_API_URL}/`,
          data,
        )
        return response.data
      },
    })
  },
  login: () => {
    return useMutation({
      mutationFn: async (data: LoginRequestBody): Promise<AuthResponseBody> => {
        const formData = new URLSearchParams()
        formData.append('username', data.username)
        formData.append('password', data.password)

        const response = await axiosInstance.post(
          `${USER_SERVICE_API_URL}/login`,
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        return response.data
      },
    })
  },
  getSingleUser: () => {
    return useMutation({
      mutationFn: async (user_id: number) => {
        const response = await axiosInstance.get(
          `${USER_SERVICE_API_URL}/info/${user_id}`,
        )
        return response.data
      },
    })
  },
  getUsers: () => {
    return useMutation({
      mutationFn: async (ids: number[]): Promise<UserPartial[]> => {
        const response = await axiosInstance.post(
          `${USER_SERVICE_API_URL}/info-many`,
          ids,
        )
        return response.data
      },
    })
  },
  searchByEmail: () => {
    return useMutation({
      mutationFn: async (email: string) => {
        const response = await axiosInstance.get(
          `${USER_SERVICE_API_URL}/search-by-email/?email=${email}`,
        )
        return response.data
      },
    })
  },
}
