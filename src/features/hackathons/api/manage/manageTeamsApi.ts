import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const manageTeamsApi = {
  useGetHackathonTeamInfo: ({
    hackathon_id,
    team_id,
  }: {
    hackathon_id: number
    team_id: number
  }) => {
    return useQuery({
      queryKey: ['hackathonTeams'],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/teams/${hackathon_id}/${team_id}`,
        )
        return response.data
      },
    })
  },
  useGetHackathonScores: ({
    hackathon_id,
    team_id,
  }: {
    hackathon_id: number
    team_id: number
  }) => {
    return useQuery({
      queryKey: ['hackathonTeamScores'],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/teams/${hackathon_id}/${team_id}/score`,
        )
        return response.data
      },
    })
  },
  useSetJuryScore: () => {
    const queryClient = useQueryClient()
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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['hackathonTeamScores'] })
      },
    })
  },
}
