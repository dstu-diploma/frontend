import {
  Attachment,
  DeleteHackathonAttachmentRequestBody,
  HackathonAttachmentResponseBody,
  UploadHackathonAttachmentRequestBody,
} from '@/features/hackathons/model/types'
import axiosInstance from '@/shared/api/axios'
import { HACKATHON_SERVICE_MANAGE_API_URL } from '@/shared/api/basePaths'
import { useMutation } from '@tanstack/react-query'

export const manageHackathonAttachmentsApi = {
  getAllHackathonAttachments: () => {
    return useMutation({
      mutationFn: async (hackathon_id: number): Promise<Attachment[]> => {
        const response = await axiosInstance.get(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}/files`,
        )
        return response.data
      },
    })
  },
  uploadHackathonAttachment: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
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
    })
  },
  deleteHackathonAttachment: () => {
    return useMutation({
      mutationFn: async ({
        hackathon_id,
        file_id,
      }: DeleteHackathonAttachmentRequestBody): Promise<HackathonAttachmentResponseBody> => {
        const response = await axiosInstance.delete(
          `${HACKATHON_SERVICE_MANAGE_API_URL}/hackathon/${hackathon_id}/files`,
          { data: { file_id } },
        )
        return response.data
      },
    })
  },
}
