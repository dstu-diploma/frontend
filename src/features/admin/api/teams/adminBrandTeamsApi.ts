import { TeamInfo } from '@/features/team'
import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_ADMIN_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const adminBrandTeamsApi = {
  useGetAllBrandTeams: () => {
    return useQuery<TeamInfo[]>({
      queryKey: ['allBrandTeams'],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/`,
        )
        return response.data
      },
    })
  },
  useGetBrandTeamFullInfo: (teamId: number) => {
    return useQuery({
      queryKey: ['brandTeamInfo', teamId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/${teamId}`,
        )
        return response.data
      },
    })
  },
  useChangeBrandTeamName: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/name`,
        )
        return response.data
      },
    })
  },
  useDeleteBrandTeam: (team_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.delete(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/${team_id}`,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allBrandTeams'] })
      },
    })
  },
  useChangeBrandTeamCaptainRights: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_ADMIN_API_URL}/brand/captain-rights`,
        )
        return response.data
      },
    })
  },
}
