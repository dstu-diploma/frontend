import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { DetailedHackathon, TeamScore } from '../../model/types'

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
  useGetMyHackathonTeamScores: ({
    hackathon_id,
    team_id,
  }: {
    hackathon_id: number
    team_id: number
  }) => {
    return useQuery({
      queryKey: ['hackathonScores', hackathon_id, team_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/teams/${hackathon_id}/${team_id}/score/my`,
        )
        return response.data
      },
    })
  },
  useGetAllMyHackathonTeamScores: ({
    hackathonInfo,
    hackathonId,
  }: {
    hackathonInfo: DetailedHackathon
    hackathonId: number
  }) => {
    return useQueries({
      queries:
        hackathonInfo?.teams?.map(team => ({
          queryKey: ['teamScores', hackathonId, team.id],
          queryFn: async () => {
            const response = await axiosInstance.get(
              `${HACKATHON_SERVICE_MANAGE_API_URL}/teams/${hackathonId}/${team.id}/score/my`,
            )
            return response.data
          },
          enabled: !!hackathonId && !!team.id,
        })) || [],
    })
  },
  useSetJuryScore: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        team_id,
        scores,
      }: {
        team_id: number
        scores: TeamScore[]
      }) => {
        const response = await axiosInstance.put(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/teams/${hackathon_id}/${team_id}/score`,
          scores,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['hackathonTeamScores'] })
      },
    })
  },
}
