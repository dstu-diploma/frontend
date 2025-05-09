import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'

export const manageCriteriaApi = {
  getCriteriaList: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/criterion/${hackathon_id}`,
        )
        return response.data
      },
    })
  },
  createCriterion: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        name,
        weight,
      }: {
        hackathon_id: number
        name: string
        weight: number
      }) => {
        const response = await axiosInstance.post(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/criterion/${hackathon_id}`,
          {
            name,
            weight,
          },
        )
        return response.data
      },
    })
  },
  updateCriterion: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        criterion_id,
        name,
        weight,
      }: {
        hackathon_id: number
        criterion_id: number
        name: string
        weight: number
      }) => {
        const response = await axiosInstance.put(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/criterion/${hackathon_id}/${criterion_id}`,
          {
            name,
            weight,
          },
        )
        return response.data
      },
    })
  },
  deleteCriterion: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        criterion_id,
      }: {
        hackathon_id: number
        criterion_id: number
      }) => {
        const response = await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/criterion/${hackathon_id}/${criterion_id}`,
        )
        return response.data
      },
    })
  },
}
