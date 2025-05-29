import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Criterion } from '../../model/types'

export const manageCriteriaApi = {
  useGetCriteriaList: (hackathon_id: number) => {
    return useQuery<Criterion[]>({
      queryKey: ['hackathonCriteria', hackathon_id],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/criterion/${hackathon_id}`,
        )
        return response.data
      },
    })
  },
  useCreateCriterion: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({ name, weight }: { name: string; weight: number }) =>
        await axiosInstance.post(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/criterion/${hackathon_id}`,
          {
            name,
            weight,
          },
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonById', hackathon_id],
        })
      },
    })
  },
  useUpdateCriterion: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        criterion_id,
        name,
        weight,
      }: {
        criterion_id: number
        name: string
        weight: number
      }) =>
        await axiosInstance.put(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/criterion/${hackathon_id}/${criterion_id}`,
          {
            name,
            weight,
          },
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonById', hackathon_id],
        })
      },
    })
  },
  useDeleteCriterion: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({ criterion_id }: { criterion_id: number }) =>
        await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/criterion/${hackathon_id}/${criterion_id}`,
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonById', hackathon_id],
        })
      },
    })
  },
}
