import { useState, useRef, useEffect } from 'react'
import { userApi } from '../../api'
import { useAvatar } from '../../../../providers/AvatarProvider'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useUploads } from '../../providers/UploadsProvider'

export const useProfileAvatar = () => {
  const user = cookiesApi.getUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const { avatarSrc, setAvatarSrc, isAvatarDeleted, setAvatarDeleted } =
    useAvatar()
  const { updateUploads, getUploads } = useUploads()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  const { mutate: setOrUpdateAvatar } = userApi.useSetOrUpdateAvatar()
  const { mutate: deleteAvatar } = userApi.useDeleteAvatar()
  const { refetch: refetchUser } = userApi.useGetSingleUser(user?.id!)

  // Инициализация состояния аватара
  useEffect(() => {
    const uploads = getUploads()
    const avatarUpload = uploads.find(
      (upload: { type?: string }) => upload.type === 'avatar',
    )
    if (avatarUpload?.url) {
      setAvatarSrc(avatarUpload.url)
      setAvatarDeleted(false)
    } else {
      setAvatarSrc(null)
      setAvatarDeleted(true)
    }
  }, [getUploads, setAvatarSrc, setAvatarDeleted])

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
    }
  }, [])

  // Обработка обновления файла аватарки
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }

    // Сохраняем текущее состояние обложки
    const currentUploads = getUploads()
    const coverUpload = currentUploads.find(
      (upload: { type?: string }) => upload.type === 'cover',
    )

    setOrUpdateAvatar(file, {
      onSuccess: async data => {
        setAvatarDeleted(false)
        setAvatarSrc(data.url)
        // Обновляем данные пользователя с сервера
        const { data: updatedUser } = await refetchUser()
        if (updatedUser) {
          cookiesApi.setUserCookie(updatedUser)
          // Обновляем состояние загрузок, сохраняя обложку
          if (coverUpload) {
            updateUploads('cover', coverUpload)
          }
          updateUploads('avatar', data)
        }
        setMenuOpen(false)
        notificationService.success(`Аватар успешно изменён`)
      },
      onError: error => {
        // В случае ошибки восстанавливаем предыдущее состояние
        if (coverUpload) {
          updateUploads('cover', coverUpload)
        }
        notificationService.error(error, `Ошибка при изменении аватара`)
      },
    })
  }

  // Обработка удаления аватарки
  const handleDeleteAvatar = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }

    setMenuOpen(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    // Сохраняем текущее состояние обложки
    const currentUploads = getUploads()
    const coverUpload = currentUploads.find(
      (upload: { type?: string }) => upload.type === 'cover',
    )

    // Обновляем состояние, удаляя только аватар
    updateUploads('avatar', null)
    setAvatarDeleted(true)
    setAvatarSrc(null)

    // Затем отправляем запрос на удаление
    deleteAvatar(undefined, {
      onSuccess: async () => {
        try {
          // Обновляем данные пользователя с сервера
          const { data: updatedUser } = await refetchUser()
          if (updatedUser) {
            cookiesApi.setUserCookie(updatedUser)
            // Восстанавливаем обложку, если она была
            if (coverUpload) {
              updateUploads('cover', coverUpload)
            }
          }
          setMenuOpen(false)
          notificationService.success(`Аватар успешно удалён!`)
        } catch (error) {
          // В случае ошибки восстанавливаем предыдущее состояние
          if (coverUpload) {
            updateUploads('cover', coverUpload)
          }
          notificationService.error(error, 'Ошибка при обновлении данных')
        }
      },
      onError: error => {
        // В случае ошибки восстанавливаем предыдущее состояние
        if (coverUpload) {
          updateUploads('cover', coverUpload)
        }
        notificationService.error(error, `Ошибка при удалении аватара`)
      },
    })
  }

  return {
    menuOpen,
    setMenuOpen,
    fileInputRef,
    avatarSrc,
    isAvatarDeleted,
    setAvatarSrc,
    handleAvatarChange,
    handleDeleteAvatar,
  }
}
