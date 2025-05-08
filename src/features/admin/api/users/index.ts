import axiosInstance from '@/shared/api/axios'
import { useMutation } from '@tanstack/react-query'
import { USER_SERVICE_API_URL } from '@/shared/api/basePaths'
import { AdminUserData } from '../../model/types'

export const adminUsersApi = {
  getAllUsers: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.get(
          `${USER_SERVICE_API_URL}/admin/`,
        )
        return response.data
      },
    })
  },
  getParticularUser: () => {
    return useMutation({
      mutationFn: async (user_id: number) => {
        const response = await axiosInstance.get(
          `${USER_SERVICE_API_URL}/admin/${user_id}`,
        )
        return response.data
      },
    })
  },
  updateUserInfo: () => {
    return useMutation({
      mutationFn: async ({
        user_id,
        data,
      }: {
        user_id: number
        data: AdminUserData
      }) => {
        const response = await axiosInstance.patch(
          `${USER_SERVICE_API_URL}/admin/${user_id}`,
          data,
        )
        return response.data
      },
    })
  },
  deleteUser: () => {
    return useMutation({
      mutationFn: async (user_id: number) => {
        const response = await axiosInstance.delete(
          `${USER_SERVICE_API_URL}/admin/${user_id}`,
        )
        return response.data
      },
    })
  },
}
