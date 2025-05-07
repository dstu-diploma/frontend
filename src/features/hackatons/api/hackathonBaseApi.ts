import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'

export const hackathonBaseApi = {
  getHackathonsList: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/hackathon/`,
        )
        return response.data
      },
    })
  },
  getHackathonById: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/hackathon/${hackathon_id}`,
        )
        return response.data
      },
    })
  },
  getHackathonTeams: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/hackathon/${hackathon_id}/teams`,
        )
        return response.data
      },
    })
  },
}
