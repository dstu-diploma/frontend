import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_HACKATHON_TEAM_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const hackathonTeamsApi = {
  useApplyToHackathon: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (data: { mate_user_ids: number[] }) => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/`,
          data,
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonById', hackathon_id],
        })
      },
    })
  },
  useGetMyHackathonTeamInfo: (hackathon_id: number) => {
    return useQuery({
      queryKey: ['myHackathonTeam', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/my`,
        )
        return response.data
      },
    })
  },
  useSetHackathonTeamRole: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/role-desc`,
        )
        return response.data
      },
    })
  },
  useSetHackathonTeamCaptainRights: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/captain-rights`,
        )
        return response.data
      },
    })
  },
  useLeaveHackathonTeam: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/`,
        )
        return response.data
      },
    })
  },
  useKickHackathonTeamMate: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        mate_id,
      }: {
        hackathon_id: number
        mate_id: number
      }) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/${mate_id}/`,
        )
        return response.data
      },
    })
  },
  useAddHackathonTeamMate: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        mate_id,
      }: {
        hackathon_id: number
        mate_id: number
      }) => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/${mate_id}/`,
        )
        return response.data
      },
    })
  },
}
