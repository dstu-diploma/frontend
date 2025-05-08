import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'

export const manageTeamsApi = {
  getHackathonTeamInfo: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        team_id,
      }: {
        hackathon_id: number
        team_id: number
      }) => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/teams/${hackathon_id}/${team_id}`,
        )
        return response.data
      },
    })
  },
  getScoresList: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        team_id,
      }: {
        hackathon_id: number
        team_id: number
      }) => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/teams/${hackathon_id}/${team_id}/score`,
        )
        return response.data
      },
    })
  },
  setJuryScore: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        team_id,
      }: {
        hackathon_id: number
        team_id: number
      }) => {
        const response = await axiosInstance.post(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/teams/${hackathon_id}/${team_id}/score`,
        )
        return response.data
      },
    })
  },
}
