import {
  Attachment,
  DeleteHackathonAttachmentRequestBody,
  HackathonAttachmentResponseBody,
  UploadHackathonAttachmentRequestBody,
} from '@/features/hackathons/model/types'
import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const manageHackathonAttachmentsApi = {
  useGetHackathonAttachments: (hackathon_id: number) => {
    return useQuery({
      queryKey: ['hackathonAttachments', hackathon_id],
      queryFn: async (): Promise<Attachment[]> => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}/files`,
        )
        return response.data
      },
    })
  },
  useUploadHackathonAttachment: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        file,
      }: UploadHackathonAttachmentRequestBody): Promise<HackathonAttachmentResponseBody> => {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axiosInstance.put(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}/files`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonAttachments', hackathon_id],
        })
      },
    })
  },
  useDeleteHackathonAttachment: (hackathon_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        file_id,
      }: DeleteHackathonAttachmentRequestBody): Promise<HackathonAttachmentResponseBody> => {
        const response = await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}/files`,
          { data: { file_id } },
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hackathonAttachments', hackathon_id],
        })
      },
    })
  },
}
