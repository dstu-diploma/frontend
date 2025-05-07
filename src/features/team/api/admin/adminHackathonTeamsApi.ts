import axiosInstance from "@/shared/api/axios"
import { TEAM_SERVICE_ADMIN_API_URL } from "@/shared/api/basePaths"
import { useMutation } from "@tanstack/react-query"

export const adminHackathonTeamsApi = {
    getAllHackathonTeams: () => {
        return useMutation({
            mutationFn: async (hackathon_id: number) => {
                const response = await axiosInstance.get(`${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}`)
                return response.data
            }
        })
    },
    getHackathonTeamFullInfo: () => {
        return useMutation({
            mutationFn: async ({ hackathon_id, team_id }: { hackathon_id: number, team_id: number }) => {
                const response = await axiosInstance.get(`${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/team/${team_id}`)
                return response.data
            }
        })
    },
    deleteHackathonTeam: () => {
        return useMutation({
            mutationFn: async ({ hackathon_id, team_id }: { hackathon_id: number, team_id: number }) => {
                const response = await axiosInstance.delete(`${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/team/${team_id}`)
                return response.data
            }
        })
    },
    setHackathonTeamRole: () => {
        return useMutation({
            mutationFn: async ({ hackathon_id, mate_user_id }: { hackathon_id: number, mate_user_id: number }) => {
                const response = await axiosInstance.put(`${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/mate/${mate_user_id}/role-desc`)
                return response.data
            }
        })
    },
    setHackathonTeamCaptainRights: () => {
        return useMutation({
            mutationFn: async ({ hackathon_id, mate_user_id }: { hackathon_id: number, mate_user_id: number }) => {
                const response = await axiosInstance.put(`${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/mate/${mate_user_id}/captain-rights`)
                return response.data
            }
        })
    },
    deleteHackathonTeamMate: () => {
        return useMutation({
            mutationFn: async ({ hackathon_id, mate_user_id }: { hackathon_id: number, mate_user_id: number }) => {
                const response = await axiosInstance.delete(`${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/mate/${mate_user_id}`)
                return response.data
            }
        })
    },
    addHackathonTeamMate: () => {
        return useMutation({
            mutationFn: async ({ hackathon_id, mate_user_id }: { hackathon_id: number, mate_user_id: number }) => {
                const response = await axiosInstance.post(`${TEAM_SERVICE_ADMIN_API_URL}/hackathon/${hackathon_id}/mate/${mate_user_id}`)
                return response.data
            }
        })
    },
}   
