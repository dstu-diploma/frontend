import { DetailedHackathon } from '@/features/hackathons/model/types'
import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const manageHackathonsApi = {
  useCreateHackathon: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (hackathon: DetailedHackathon) => {
        const response = await axiosInstance.post(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/`,
          hackathon,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['hackathonList'] })
      },
    })
  },
  useDeleteHackathon: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}`,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['hackathonList'] })
      },
    })
  },
  useUpdateHackathonInfo: (hackathonId: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (data: DetailedHackathon) => {
        const response = await axiosInstance.patch(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathonId}`,
          data,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonById', hackathonId],
        })
      },
    })
  },
  useCalculateHackathonResults: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async () => {
        await axiosInstance.put(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}/score`,
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonLeaderboard', hackathon_id],
        })
      },
    })
  },
}
