import { useState, useRef, useEffect } from 'react'
import { userApi } from '../../api'
import { useAvatar } from '../../../../providers/AvatarProvider'

import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useProfileAvatar = () => {
  const user = cookiesApi.getUser()

  const [menuOpen, setMenuOpen] = useState(false)
  const { avatarSrc, setAvatarSrc, isAvatarDeleted, setAvatarDeleted } =
    useAvatar()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  const { mutate: setOrUpdateAvatar } = userApi.useSetOrUpdateAvatar()
  const { mutate: deleteAvatar } = userApi.useDeleteAvatar()

  // Инициализация состояния аватара
  useEffect(() => {
    if (user?.uploads) {
      const avatarUpload = user.uploads.find(
        (upload: { type?: string }) => upload.type === 'avatar',
      )
      if (avatarUpload?.url) {
        setAvatarSrc(avatarUpload.url)
        setAvatarDeleted(false)
      } else {
        setAvatarSrc(null)
        setAvatarDeleted(true)
      }
    }
  }, [user?.uploads, setAvatarSrc, setAvatarDeleted])

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

    setOrUpdateAvatar(file, {
      onSuccess: data => {
        setAvatarDeleted(false)
        setAvatarSrc(data.url)
        if (user) {
          const currentUploads = user.uploads || []
          const avatarUpload = currentUploads.find(
            (upload: { type?: string }) => upload.type === 'avatar',
          )
          if (avatarUpload) {
            avatarUpload.url = data.url
          } else {
            currentUploads.push({ ...data, type: 'avatar' })
          }
          user.uploads = currentUploads
          cookiesApi.setUserCookie(user)
        }
        setMenuOpen(false)
        notificationService.success(`Аватар успешно изменён`)
      },
      onError: error => {
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

    // Сначала обновим локальное состояние
    if (user) {
      const currentUploads = user.uploads || []
      const coverUploads = currentUploads.filter(
        (upload: { type?: string }) => upload.type === 'cover',
      )
      user.uploads = coverUploads
      cookiesApi.setUserCookie(user)
    }
    setAvatarDeleted(true)
    setAvatarSrc(null)

    // Затем отправим запрос на удаление
    deleteAvatar(undefined, {
      onSuccess: () => {
        setMenuOpen(false)
        notificationService.success(`Аватар успешно удалён!`)
      },
      onError: error => {
        // В случае ошибки восстанавливаем предыдущее состояние
        if (user) {
          const currentUploads = user.uploads || []
          const avatarUpload = currentUploads.find(
            (upload: { type?: string }) => upload.type === 'avatar',
          )
          if (avatarUpload) {
            setAvatarSrc(avatarUpload.url)
            setAvatarDeleted(false)
          }
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
