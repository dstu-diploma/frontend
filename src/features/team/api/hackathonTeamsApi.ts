import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_HACKATHON_TEAM_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'

export const hackathonTeamsApi = {
  registerTeamOnHackathon: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.post(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/`,
        )
        return response.data
      },
    })
  },
  getMyHackathonTeamInfo: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.get(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/my`,
        )
        return response.data
      },
    })
  },
  setHackathonTeamRole: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/role-desc`,
        )
        return response.data
      },
    })
  },
  setHackathonTeamCaptainRights: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/captain-rights`,
        )
        return response.data
      },
    })
  },
  leaveHackathonTeam: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.put(
          `${TEAM_SERVICE_HACKATHON_TEAM_API_URL}/${hackathon_id}/mate/`,
        )
        return response.data
      },
    })
  },
  kickHackathonTeamMate: () => {
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
  addHackathonTeamMate: () => {
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
