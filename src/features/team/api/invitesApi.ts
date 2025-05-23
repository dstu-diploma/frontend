import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TeamInvite } from '../model/types'

export const invitesApi = {
  useGetUserInvites: () => {
    return useQuery<TeamInvite[]>({
      queryKey: ['teamInvites'],
      queryFn: async () => {
        try {
          const response = await axiosInstance.get(
            `${TEAM_SERVICE_API_URL}/invite/`,
          )
          return response.data
        } catch (error) {
          console.error(error)
        }
      },
    })
  },
  useSendInvite: () => {
    return useMutation({
      mutationFn: async (user_id: number) =>
        await axiosInstance.post(
          `${TEAM_SERVICE_API_URL}/invite/create/${user_id}`,
        ),
    })
  },
  useAcceptInvite: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (team_id: number) =>
        await axiosInstance.post(`${TEAM_SERVICE_API_URL}/invite/${team_id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teamInvites'] })
        queryClient.invalidateQueries({ queryKey: ['myTeamInfo'] })
        queryClient.invalidateQueries({ queryKey: ['teamMates'] })
      },
    })
  },
  useDenyInvite: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (team_id: number) =>
        await axiosInstance.delete(`${TEAM_SERVICE_API_URL}/invite/${team_id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teamInvites'] })
      },
    })
  },
}
