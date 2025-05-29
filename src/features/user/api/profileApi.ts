import axiosInstance from '@/shared/api/axios'
import { useMutation } from '@tanstack/react-query'
import { ProfileFormData } from '../model/schemas'
import { AvatarObject } from '../model/types'
import { USER_SERVICE_API_URL } from '@/shared/api/basePaths'

export const profileApi = {
  useUpdateProfile: () => {
    return useMutation({
      mutationFn: async (
        profile: Partial<ProfileFormData>,
      ): Promise<ProfileFormData> => {
        const response = await axiosInstance.patch(
          `${USER_SERVICE_API_URL}/`,
          profile,
        )
        return response.data
      },
    })
  },
  useSetOrUpdateAvatar: () => {
    return useMutation({
      mutationFn: async (file: File): Promise<AvatarObject> => {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axiosInstance.put(
          `${USER_SERVICE_API_URL}/avatar`,
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
  useDeleteAvatar: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.delete(
          `${USER_SERVICE_API_URL}/avatar`,
        )
        return response.data
      },
    })
  },
  useSetOrUpdateCover: () => {
    return useMutation({
      mutationFn: async (file: File): Promise<AvatarObject> => {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axiosInstance.put(
          `${USER_SERVICE_API_URL}/cover`,
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
  useDeleteCover: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.delete(
          `${USER_SERVICE_API_URL}/cover`,
        )
        return response.data
      },
    })
  },
}
