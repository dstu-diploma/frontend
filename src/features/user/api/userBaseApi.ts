import axiosInstance from '@/shared/api/axios'
import { USER_SERVICE_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  RegisterRequestBody,
  AuthResponseBody,
  LoginRequestBody,
  UserPartial,
  FullUser,
} from '../model/types'
import { ProfileFormData } from '../model/schemas'

export const userBaseApi = {
  useRegister: () => {
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
  useLogin: () => {
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
  useGetSingleUser: (user_id: number) => {
    return useQuery<FullUser>({
      queryKey: ['singleUser', user_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${USER_SERVICE_API_URL}/info/${user_id}`,
        )
        return response.data
      },
    })
  },
  useGetUsers: (userIds: number[]) => {
    return useQuery<UserPartial[]>({
      queryKey: ['users', userIds],
      queryFn: async (): Promise<UserPartial[]> => {
        const response = await axiosInstance.post(
          `${USER_SERVICE_API_URL}/info-many`,
          { ids: userIds },
        )
        return response.data
      },
      enabled: !!userIds.length,
    })
  },
  useSearchByEmail: () => {
    return useMutation({
      mutationFn: async (email: string) => {
        const response = await axiosInstance.get(
          `${USER_SERVICE_API_URL}/search-by-email/?email=${email}`,
        )
        return response.data
      },
    })
  },
  updateProfile: (data: ProfileFormData) => {
    return axiosInstance.patch(`${USER_SERVICE_API_URL}/`, data)
  },
}
