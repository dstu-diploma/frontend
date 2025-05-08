import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'
import { Hackathon } from '../../model/types'

export const manageHackathonsApi = {
  createHackathon: () => {
    return useMutation({
      mutationFn: async (hackathon: Hackathon) => {
        const response = await axiosInstance.post(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/`,
          hackathon,
        )
        return response.data
      },
    })
  },
  deleteHackathon: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}`,
        )
        return response.data
      },
    })
  },
  updateHackathonInfo: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}`,
        )
        return response.data
      },
    })
  },
}
