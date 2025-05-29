import { cookiesApi } from '@/shared/lib/helpers/cookies'

import { useRef, useEffect, useMemo } from 'react'
import { userApi } from '../../api'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useProfileCover = () => {
  const user = cookiesApi.getUser()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  const { mutate: setOrUpdateCover } = userApi.useSetOrUpdateCover()
  const { mutate: deleteCover } = userApi.useDeleteCover()

  const coverUrl = useMemo(() => {
    if (objectUrlRef.current) {
      return objectUrlRef.current
    }
    const coverUpload = user?.uploads?.find(
      (upload: { type?: string }) => upload.type === 'cover',
    )
    return coverUpload?.url
  }, [user])

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
    }
  }, [])

  // Обработка обновления обложки
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }

    setOrUpdateCover(file, {
      onSuccess: data => {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current)
        }
        objectUrlRef.current = URL.createObjectURL(file)
        if (user) {
          const currentUploads = user.uploads || []
          const coverUpload = currentUploads.find(
            (upload: { type?: string }) => upload.type === 'cover',
          )
          if (coverUpload) {
            coverUpload.url = data.url
          } else {
            currentUploads.push({ ...data, type: 'cover' })
          }
          user.uploads = currentUploads
          cookiesApi.setUserCookie(user)
        }
        notificationService.success('Обложка успешно изменена')
      },
      onError: error => {
        notificationService.error(error, 'Ошибка при изменении обложки')
      },
    })
  }

  // Обработка клика по обложке
  const handleCoverClick = () => {
    fileInputRef.current?.click()
  }

  // Обработка удаления обложки
  const handleCoverDelete = () => {
    deleteCover(undefined, {
      onSuccess: () => {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current)
          objectUrlRef.current = null
        }

        if (user) {
          const currentUploads = user.uploads || []
          const updatedUploads = currentUploads.filter(
            (upload: { type?: string }) => upload.type !== 'cover',
          )
          user.uploads = updatedUploads
          cookiesApi.setUserCookie(user)
          notificationService.success('Обложка успешно удалена')
        }
      },
      onError: error => {
        notificationService.error(error, `Ошибка при удалении обложки`)
      },
    })
  }

  return {
    coverUrl,
    fileInputRef,
    handleCoverChange,
    handleCoverClick,
    handleCoverDelete,
    objectUrlRef,
  }
}
