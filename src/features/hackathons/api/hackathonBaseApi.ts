import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_API_URL } from '@/shared/api/basePaths'
import { useQuery } from '@tanstack/react-query'
import { DetailedHackathon, Hackathon } from '../model/types'
import { TeamInfo } from '@/features/team'

export const hackathonBaseApi = {
  useGetHackathonList: () => {
    return useQuery<Hackathon[]>({
      queryKey: ['hackathonList'],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/`,
        )
        return response.data
      },
      staleTime: 60 * 10 * 1000,
    })
  },
  useGetHackathonById: (hackathon_id: number) => {
    return useQuery<DetailedHackathon>({
      queryKey: ['hackathonById', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/${hackathon_id}`,
        )
        return response.data
      },
      staleTime: 60 * 10 * 1000,
    })
  },
  useGetMyHackathonTeam: (hackathon_id: number) => {
    return useQuery<TeamInfo>({
      queryKey: ['hackathonTeam', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/${hackathon_id}/my`,
        )
        return response.data
      },
    })
  },
  useGetHackathonTeams: (hackathon_id: number) => {
    return useQuery<TeamInfo[]>({
      queryKey: ['hackathonTeams', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/${hackathon_id}/teams`,
        )
        return response.data
      },
    })
  },
  useGetCriteriaList: (hackathon_id: number) => {
    return useQuery<TeamInfo>({
      queryKey: ['criteriaList', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/${hackathon_id}/criteria`,
        )
        return response.data
      },
    })
  },
  useGetJuryList: (hackathon_id: number) => {
    return useQuery<TeamInfo>({
      queryKey: ['judgesList', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/${hackathon_id}/judges`,
        )
        return response.data
      },
    })
  },
  useGetLeaderboard: (hackathon_id: number) => {
    return useQuery({
      queryKey: ['hackathonLeaderboard', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_API_URL}/${hackathon_id}/results`,
        )
        return response.data
      },
    })
  },
}
