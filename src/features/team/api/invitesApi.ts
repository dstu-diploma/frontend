import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'

export const invitesApi = {
  sendInvite: () => {
    return useMutation({
      mutationFn: async (user_id: number) => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_API_URL}/invite/create/${user_id}`,
        )
        return response.data
      },
    })
  },
  acceptInvite: () => {
    return useMutation({
      mutationFn: async (team_id: number) => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_API_URL}/invite/${team_id}`,
        )
        return response.data
      },
    })
  },
  denyInvite: () => {
    return useMutation({
      mutationFn: async (team_id: number) => {
        const response = await axiosInstance.delete(
          `${TEAM_SERVICE_API_URL}/invite/${team_id}`,
        )
        return response.data
      },
    })
  },
  getUserInvites: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_API_URL}/invite/`,
        )
        return response.data
      },
    })
  },
}
