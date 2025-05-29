import { cookiesApi } from '@/shared/lib/helpers/cookies'

import { useRef, useEffect, useMemo, useState } from 'react'
import { userApi } from '../../api'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useProfileCover = () => {
  const user = cookiesApi.getUser()
  const [localCoverUrl, setLocalCoverUrl] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)
  const pendingFileRef = useRef<File | null>(null)

  const { mutate: setOrUpdateCover, isPending: isUpdatingCover } =
    userApi.useSetOrUpdateCover()
  const { mutate: deleteCover, isPending: isDeletingCover } =
    userApi.useDeleteCover()

  const isLoading = isUpdatingCover || isDeletingCover

  const coverUrl = useMemo(() => {
    if (localCoverUrl) {
      return localCoverUrl
    }
    if (objectUrlRef.current) {
      return objectUrlRef.current
    }
    const coverUpload = user?.uploads?.find(
      (upload: { type?: string }) => upload.type === 'cover',
    )
    return coverUpload?.url
  }, [user, localCoverUrl])

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [])

  const cleanupObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
  }

  // Обработка обновления обложки
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    cleanupObjectUrl()
    pendingFileRef.current = file

    setOrUpdateCover(file, {
      onSuccess: data => {
        cleanupObjectUrl()
        setLocalCoverUrl(data.url)
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
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        pendingFileRef.current = null
      },
      onError: error => {
        cleanupObjectUrl()
        notificationService.error(error, 'Ошибка при изменении обложки')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        pendingFileRef.current = null
      },
    })
  }

  // Обработка клика по обложке
  const handleCoverClick = () => {
    if (isLoading) return
    fileInputRef.current?.click()
  }

  // Обработка удаления обложки
  const handleCoverDelete = () => {
    if (isLoading) return

    cleanupObjectUrl()
    setLocalCoverUrl(null)
    pendingFileRef.current = null

    deleteCover(undefined, {
      onSuccess: () => {
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
    isLoading,
  }
}
