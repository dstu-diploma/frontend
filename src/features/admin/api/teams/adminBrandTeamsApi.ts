import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_ADMIN_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'

export const adminBrandTeamsApi = {
  getAllBrandTeams: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/`,
        )
        return response.data
      },
    })
  },
  changeBrandTeamName: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/name`,
        )
        return response.data
      },
    })
  },
  getBrandTeamFullInfo: () => {
    return useMutation({
      mutationFn: async (team_id: number) => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/${team_id}`,
        )
        return response.data
      },
    })
  },
  deleteBrandTeam: () => {
    return useMutation({
      mutationFn: async (team_id: number) => {
        const response = await axiosInstance.delete(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/${team_id}`,
        )
        return response.data
      },
    })
  },
  changeBrandTeamCaptainRights: () => {
    return useMutation({
      mutationFn: async (team_id: number) => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/captain-rights`,
        )
        return response.data
      },
    })
  },
}
