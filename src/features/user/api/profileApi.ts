import axiosInstance, { API_URL } from '@/shared/api/axios'
import { useMutation } from '@tanstack/react-query'
import { ProfileFormData } from '../model/schemas'
import { RefreshResponseBody } from '../model/types'
import { USER_SERVICE_API_URL } from '@/shared/api/basePaths'

export const profileApi = {
  updateProfile: () => {
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
  setOrUpdateAvatar: () => {
    return useMutation({
      mutationFn: async (file: File): Promise<RefreshResponseBody> => {
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
  deleteAvatar: () => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosInstance.delete(
          `${USER_SERVICE_API_URL}/avatar`,
        )
        return response.data
      },
    })
  },
  getAvatar: (user_id: number) => {
    return API_URL + '/uploads/avatars/' + user_id + '.jpg'
  },
  isAvatarExists: async (url: string): Promise<boolean> => {
    return new Promise(resolve => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  },
}
