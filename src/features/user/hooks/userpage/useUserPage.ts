import { generateGradient } from '@/shared/lib/helpers/gradient'
import { useState, useMemo } from 'react'
import { userApi } from '../../api'

export const useUserPage = (page_id: number) => {
  const [gradient] = useState(generateGradient())
  const {
    data: user,
    error: userLoadError,
    isLoading: isUserLoading,
  } = userApi.useGetSingleUser(page_id)

  // Путь к аватару
  const avatarUrl = useMemo(() => {
    if (user && user.uploads) {
      const avatarUpload = user.uploads.find(upload => upload.type === 'avatar')
      return avatarUpload?.url || null
    }
    return null
  }, [user])

  // Путь к обложке
  const coverUrl = useMemo(() => {
    if (user && user.uploads) {
      const avatarUpload = user.uploads.find(upload => upload.type === 'cover')
      return avatarUpload?.url || null
    }
    return null
  }, [user])

  // Инициалы пользователя
  const getInitials = () => {
    return `${user?.first_name[0]}${user?.last_name[0]}`
  }

  return {
    user,
    isUserLoading,
    getInitials,
    coverUrl,
    avatarUrl,
    gradient,
    userLoadError,
  }
}
