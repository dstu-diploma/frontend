import { DetailedHackathon } from '@/features/hackathons/model/types'
import { useQueryClient, useQueries } from '@tanstack/react-query'
import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_ADMIN_API_URL } from '@/shared/api/basePaths'

export const useAdminHackathonTeams = () => {
  const queryClient = useQueryClient()
  const hackathons = queryClient.getQueryData([
    'hackathonList',
  ]) as DetailedHackathon[]

  const teamQueries = useQueries({
    queries:
      hackathons?.map(hackathon => ({
        queryKey: ['hackathonTeams', hackathon.id],
        queryFn: async () => {
          const response = await axiosInstance.get(
            `${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon.id}`,
          )
          return response.data
        },
        enabled: !!hackathon.id,
      })) ?? [],
  })

  const hackathonTeams = teamQueries.map(query => query.data)
  const isHackathonTeamsLoading = teamQueries.some(query => query.isLoading)

  return {
    hackathonTeams,
    isHackathonTeamsLoading,
  }
}
