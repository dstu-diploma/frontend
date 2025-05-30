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
  useSetHackathonTeamRole: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({ role_desc }: { role_desc: string }) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/role-desc`,
          { role_desc },
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['myHackathonTeam', hackathon_id],
        })
      },
    })
  },
  useSetHackathonTeamCaptainRights: (hackathon_id: number) => {
    return useMutation({
      mutationFn: async ({
        user_id,
        is_captain,
      }: {
        user_id: number
        is_captain: boolean
      }) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/captain-rights`,
          { user_id, is_captain },
        )
        return response.data
      },
    })
  },
  useLeaveHackathonTeam: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.delete(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/`,
        )
        return response.data
      },
    })
  },
  useKickHackathonTeamMate: (hackathon_id: number) => {
    return useMutation({
      mutationFn: async ({ mate_id }: { mate_id: number }) => {
        const response = await axiosInstance.delete(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/${mate_id}/`,
        )
        return response.data
      },
    })
  },
  useAddHackathonTeamMate: (hackathon_id: number) => {
    return useMutation({
      mutationFn: async ({ mate_id }: { mate_id: number }) => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/${mate_id}/`,
        )
        return response.data
      },
    })
  },
}
