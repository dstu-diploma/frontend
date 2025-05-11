import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useState, useRef, useEffect } from 'react'
import { useToast } from '@/shared/hooks/use-toast'
import { userApi } from '../../api'
import { useAvatar } from '../../context/AvatarContext'

export const useProfileAvatar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [timestamp, setTimestamp] = useState<number>(Date.now())
  const { avatarSrc, setAvatarSrc } = useAvatar()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)
  const { toast, dismiss } = useToast()

  const { mutate: setOrUpdateAvatar } = userApi.setOrUpdateAvatar()
  const { mutate: deleteAvatar } = userApi.deleteAvatar()

  useEffect(() => {
    const prepareAvatar = async () => {
      const user = cookiesApi.getUser()
      const avatarPath = userApi.getAvatar(user.id)
      const exists = await userApi.isAvatarExists(avatarPath)
      if (exists) {
        setAvatarSrc(`${avatarPath}?t=${timestamp}`)
      } else {
        setAvatarSrc(null)
      }
    }
    prepareAvatar()
  }, [timestamp, setAvatarSrc])

  const refreshAvatar = () => {
    setTimestamp(Date.now())
  }

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
    }
  }, [])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }

    const newObjectUrl = URL.createObjectURL(file)
    objectUrlRef.current = newObjectUrl
    setAvatarSrc(newObjectUrl)
    setMenuOpen(false)

    setOrUpdateAvatar(file, {
      onSuccess: () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: 'Аватар успешно изменен!',
        })
      },
      onError: error => {
        const title = error.message.includes('403')
          ? 'Обновите сессию'
          : undefined
        dismiss()
        toast({
          title: title,
          variant: 'destructive',
          description: 'Ошибка при изменении аватара',
        })
        console.error(`${error.message}`)
      },
    })
  }

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
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: 'Аватар успешно удалён!',
        })
        setAvatarSrc(null)
        setTimestamp(Date.now())
      },
      onError: error => {
        const title = error.message.includes('403')
          ? 'Обновите сессию'
          : undefined
        dismiss()
        toast({
          title: title,
          variant: 'destructive',
          description: 'Ошибка при удалении аватарки',
        })
        const user = cookiesApi.getUser()
        const avatarPath = userApi.getAvatar(user.id)
        setAvatarSrc(`${avatarPath}?t=${timestamp}`)
      },
    })
  }

  return {
    menuOpen,
    setMenuOpen,
    fileInputRef,
    avatarSrc,
    setAvatarSrc,
    handleAvatarChange,
    handleDeleteAvatar,
  }
}
