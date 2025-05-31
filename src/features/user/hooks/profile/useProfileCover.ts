import { cookiesApi } from '@/shared/lib/helpers/cookies'

import { useRef, useEffect, useMemo, useState } from 'react'
import { userApi } from '../../api'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useUploads } from '../../providers/UploadsProvider'

export const useProfileCover = () => {
  const user = cookiesApi.getUser()
  const [localCoverUrl, setLocalCoverUrl] = useState<string | null>(null)
  const { updateUploads, getUploads } = useUploads()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)
  const pendingFileRef = useRef<File | null>(null)

  const { mutate: setOrUpdateCover, isPending: isUpdatingCover } =
    userApi.useSetOrUpdateCover()
  const { mutate: deleteCover, isPending: isDeletingCover } =
    userApi.useDeleteCover()
  const { refetch: refetchUser } = userApi.useGetSingleUser(user?.id!)

  const isLoading = isUpdatingCover || isDeletingCover

  const coverUrl = useMemo(() => {
    if (localCoverUrl) {
      return localCoverUrl
    }
    if (objectUrlRef.current) {
      return objectUrlRef.current
    }
    const uploads = getUploads()
    const coverUpload = uploads.find(
      (upload: { type?: string }) => upload.type === 'cover',
    )
    return coverUpload?.url
  }, [getUploads, localCoverUrl])

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

    // Сохраняем текущее состояние аватара
    const currentUploads = getUploads()
    const avatarUpload = currentUploads.find(
      (upload: { type?: string }) => upload.type === 'avatar',
    )

    setOrUpdateCover(file, {
      onSuccess: async data => {
        cleanupObjectUrl()
        setLocalCoverUrl(data.url)
        // Обновляем данные пользователя с сервера
        const { data: updatedUser } = await refetchUser()
        if (updatedUser) {
          cookiesApi.setUserCookie(updatedUser)
          // Обновляем состояние загрузок, сохраняя аватар
          if (avatarUpload) {
            updateUploads('avatar', avatarUpload)
          }
          updateUploads('cover', data)
        }
        notificationService.success('Обложка успешно изменена')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        pendingFileRef.current = null
      },
      onError: error => {
        cleanupObjectUrl()
        // В случае ошибки восстанавливаем предыдущее состояние
        if (avatarUpload) {
          updateUploads('avatar', avatarUpload)
        }
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

    // Сохраняем текущее состояние загрузок
    const currentUploads = getUploads()
    const avatarUpload = currentUploads.find(
      (upload: { type?: string }) => upload.type === 'avatar',
    )

    // Обновляем состояние, удаляя только обложку
    updateUploads('cover', null)

    // Затем отправляем запрос на удаление
    deleteCover(undefined, {
      onSuccess: async () => {
        try {
          // Обновляем данные пользователя с сервера
          const { data: updatedUser } = await refetchUser()
          if (updatedUser) {
            cookiesApi.setUserCookie(updatedUser)
            // Восстанавливаем аватар, если он был
            if (avatarUpload) {
              updateUploads('avatar', avatarUpload)
            }
          }
          notificationService.success('Обложка успешно удалена')
        } catch (error) {
          // В случае ошибки восстанавливаем предыдущее состояние
          if (avatarUpload) {
            updateUploads('avatar', avatarUpload)
          }
          notificationService.error(error, 'Ошибка при обновлении данных')
        }
      },
      onError: error => {
        // В случае ошибки восстанавливаем предыдущее состояние
        if (avatarUpload) {
          updateUploads('avatar', avatarUpload)
        }
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
