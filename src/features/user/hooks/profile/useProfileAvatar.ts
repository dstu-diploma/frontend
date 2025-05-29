import { useState, useRef, useEffect } from 'react'
import { userApi } from '../../api'
import { useAvatar } from '../../../../providers/AvatarProvider'

import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { notificationService } from '@/shared/lib/services/notification.service'

export const useProfileAvatar = () => {
  const user = cookiesApi.getUser()

  const [menuOpen, setMenuOpen] = useState(false)
  const [isAvatarDeleted, setAvatarDeleted] = useState<boolean>(false)
  const { avatarSrc, setAvatarSrc } = useAvatar()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  const { mutate: setOrUpdateAvatar } = userApi.useSetOrUpdateAvatar()
  const { mutate: deleteAvatar } = userApi.useDeleteAvatar()

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
          user.uploads = [data]
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

    deleteAvatar(undefined, {
      onSuccess: () => {
        setMenuOpen(false)
        if (user) {
          user.uploads = null
          cookiesApi.setUserCookie(user)
        }
        setAvatarDeleted(true)
        notificationService.success(`Аватар успешно удалён!`)
        setAvatarSrc(null)
      },
      onError: error => {
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
