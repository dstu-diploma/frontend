import axiosInstance from '@/shared/api/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { USER_SERVICE_API_URL } from '@/shared/api/basePaths'
import { AdminUserData } from '../../model/types'

export const adminUsersApi = {
  useGetAllUsers: () => {
    return useQuery({
      queryKey: ['allUsers'],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${USER_SERVICE_API_URL}/admin/`,
        )
        return response.data
      },
    })
  },
  useGetParticularUser: (userId: number) => {
    return useQuery({
      queryKey: ['adminUserById', userId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${USER_SERVICE_API_URL}/admin/${userId}`,
        )
        return response.data
      },
    })
  },
  useUpdateUserInfo: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        userId,
        data,
      }: {
        userId: number
        data: AdminUserData
      }) => {
        const response = await axiosInstance.patch(
          `${USER_SERVICE_API_URL}/admin/${userId}`,
          data,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allUsers'] })
      },
    })
  },
  useDeleteUser: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (userId: number) => {
        const response = await axiosInstance.delete(
          `${USER_SERVICE_API_URL}/admin/${userId}`,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allUsers'] })
      },
    })
  },
  useBanUser: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        userId,
        is_banned,
      }: {
        userId: number
        is_banned: boolean
      }) => {
        const response = await axiosInstance.post(
          `${USER_SERVICE_API_URL}/admin/${userId}/ban`,
          { is_banned },
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allUsers'] })
      },
    })
  },
}
