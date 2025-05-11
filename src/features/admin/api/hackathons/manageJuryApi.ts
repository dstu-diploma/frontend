import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'

export const manageJuryApi = {
  getJuryList: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number) => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/judge/${hackathon_id}`,
        )
        return response.data
      },
    })
  },
  addJudge: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        judge_user_id,
      }: {
        hackathon_id: number
        judge_user_id: number
      }) => {
        const response = await axiosInstance.post(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/judge/${hackathon_id}`,
          { judge_user_id },
        )
        return response.data
      },
    })
  },
  deleteJudge: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        judge_user_id,
      }: {
        hackathon_id: number
        judge_user_id: number
      }) => {
        const response = await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/judge/${hackathon_id}`,
          { data: { judge_user_id } },
        )
        return response.data
      },
    })
  },
}
