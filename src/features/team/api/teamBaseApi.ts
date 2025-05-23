import axiosInstance from '@/shared/api/axios'
import { TEAM_SERVICE_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  TeamCaptainRequestBody,
  TeamCreateRequestBody,
  TeamInfo,
  TeamMateRef,
  TeamRenameRequestBody,
} from '../model/types'
import { AxiosError } from 'axios'

export const teamBaseApi = {
  useCreateTeam: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (data: TeamCreateRequestBody) =>
        await axiosInstance.post(`${TEAM_SERVICE_API_URL}/`, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['myTeamInfo'] })
        queryClient.invalidateQueries({ queryKey: ['teamMates'] })
      },
      onError: (error: AxiosError<{ detail?: string }>) => {
        if (error.response?.status === 400) {
          const errorMessage =
            error.response.data?.detail || 'Некорректный запрос'
          console.warn('Ошибка создания команды:', errorMessage)
          return
        }
        console.error('Ошибка создания команды:', error.message)
      },
    })
  },
  useGetTeamMates: () => {
    return useQuery<TeamMateRef[] | null>({
      queryKey: ['teamMates'],
      queryFn: async () => {
        try {
          const response = await axiosInstance.get(
            `${TEAM_SERVICE_API_URL}/mate`,
          )
          return response.data ?? null
        } catch (error) {
          const axiosError = error as AxiosError<{ detail?: string }>
          if (axiosError.response?.status === 400) {
            console.warn(
              'Нет данных о команде:',
              axiosError.response.data?.detail,
            )
            return []
          }
          throw error
        }
      },
      staleTime: 60 * 1000 * 10,
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError
        return axiosError.response?.status !== 400 && failureCount < 3
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    })
  },
  useGetMyTeamInfo: () => {
    return useQuery<TeamInfo>({
      queryKey: ['myTeamInfo'],
      queryFn: async () => {
        try {
          const response = await axiosInstance.get(
            `${TEAM_SERVICE_API_URL}/info`,
          )
          return response.data ?? null
        } catch (error) {
          const axiosError = error as AxiosError
          if (axiosError.response?.status === 400) {
            return null
          }
          throw error
        }
      },
      staleTime: 60 * 1000 * 10,
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError
        return axiosError.response?.status !== 400 && failureCount < 3
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    })
  },
  useRenameTeam: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (team_name: TeamRenameRequestBody) => {
        await axiosInstance.post(`${TEAM_SERVICE_API_URL}/name`, team_name)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teamInfo'] })
      },
    })
  },
  useLeaveTeam: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async () =>
        await axiosInstance.delete(`${TEAM_SERVICE_API_URL}/mate/`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['myTeamInfo'] })
        queryClient.invalidateQueries({ queryKey: ['teamMates'] })
      },
    })
  },
  useKickMate: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (member: TeamMateRef) =>
        axiosInstance.delete(`${TEAM_SERVICE_API_URL}/mate/${member.user_id}`),
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ['teamMates'] })
      },
    })
  },
  useSetTeamMateRole: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (role_desc: string) =>
        await axiosInstance.put(`${TEAM_SERVICE_API_URL}/mate/role-desc`, {
          role_desc: role_desc,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teamMates'] })
      },
    })
  },
  useSetCaptainRights: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (captainInfo: TeamCaptainRequestBody) =>
        await axiosInstance.put(
          `${TEAM_SERVICE_API_URL}/mate/captain-rights/`,
          captainInfo,
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teamMates'] })
      },
    })
  },
}
