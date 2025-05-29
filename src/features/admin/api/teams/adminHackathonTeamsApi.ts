import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_ADMIN_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery } from '@tanstack/react-query'

export const adminHackathonTeamsApi = {
  useGetAllHackathonTeams: (hackathonId: number) => {
    return useQuery({
      queryKey: ['allHackathonTeams'],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathonId}`,
        )
        return response.data
      },
    })
  },
  useGetHackathonTeamFullInfo: ({
    hackathonId,
    teamId,
  }: {
    hackathonId: number
    teamId: number
  }) => {
    return useQuery({
      queryKey: ['hackathonTeamInfo', hackathonId, teamId],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathonId}/team/${teamId}`,
        )
        return response.data
      },
    })
  },
  useDeleteHackathonTeam: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        team_id,
      }: {
        hackathon_id: number
        team_id: number
      }) => {
        const response = await axiosInstance.delete(
          `${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/team/${team_id}`,
        )
        return response.data
      },
    })
  },
  useSetHackathonTeamRole: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        mate_user_id,
      }: {
        hackathon_id: number
        mate_user_id: number
      }) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/mate/${mate_user_id}/role-desc`,
        )
        return response.data
      },
    })
  },
  useSetHackathonTeamCaptainRights: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        mate_user_id,
      }: {
        hackathon_id: number
        mate_user_id: number
      }) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/mate/${mate_user_id}/captain-rights`,
        )
        return response.data
      },
    })
  },
  useDeleteHackathonTeamMate: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        mate_user_id,
      }: {
        hackathon_id: number
        mate_user_id: number
      }) => {
        const response = await axiosInstance.delete(
          `${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/mate/${mate_user_id}`,
        )
        return response.data
      },
    })
  },
  useAddHackathonTeamMate: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        mate_user_id,
      }: {
        hackathon_id: number
        mate_user_id: number
      }) => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/mate/${mate_user_id}`,
        )
        return response.data
      },
    })
  },
}
