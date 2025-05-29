import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Judge } from '../../model/types'

export const manageJuryApi = {
  useGetJuryList: (hackathon_id: number) => {
    return useQuery<Judge[]>({
      queryKey: ['hackathonJudges', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/judge/${hackathon_id}`,
        )
        return response.data
      },
    })
  },
  useAddJudge: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({ judge_user_id }: { judge_user_id: number }) =>
        await axiosInstance.post(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/judge/${hackathon_id}`,
          { judge_user_id },
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonById', hackathon_id],
        })
      },
    })
  },
  useDeleteJudge: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({ judge_user_id }: { judge_user_id: number }) =>
        await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/judge/${hackathon_id}`,
          { data: { judge_user_id } },
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonById', hackathon_id],
        })
      },
    })
  },
}
