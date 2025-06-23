import { adminApi } from '../../../api'
import { TeamInfo, TeamRef } from '@/features/team/model/types'
import { useQueries } from '@tanstack/react-query'
import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_API_URL } from '@/shared/api/basePaths'

export const useAdminBrandTeams = () => {
  const { data: brandTeamsRefs, isLoading: isBrandTeamsLoading } =
    adminApi.useGetAllBrandTeams()

  const teamQueries = useQueries({
    queries:
      brandTeamsRefs?.map((ref: TeamInfo) => ({
        queryKey: ['teamInfo', ref.id],
        queryFn: async () => {
          const response = await axiosInstance.get(
            `${TEAM_SERVICE_API_URL}/info/${ref.id}`,
          )
          return response.data
        },
        enabled: !!ref.id,
      })) ?? [],
  })

  const brandTeams = teamQueries.map(query => query.data)
  const isTeamsLoading = teamQueries.some(query => query.isLoading)

  return {
    brandTeams,
    isBrandTeamsLoading: isBrandTeamsLoading || isTeamsLoading,
  }
}
