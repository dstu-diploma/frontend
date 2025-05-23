import { useState, useRef, useEffect } from 'react'
import { useToast } from '@/shared/hooks/use-toast'
import { userApi } from '../../api'
import { useAvatar } from '../../context/AvatarContext'
import { AxiosError } from 'axios'

export const useProfileAvatar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { avatarSrc, setAvatarSrc } = useAvatar()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)
  const { toast, dismiss } = useToast()

  const { mutate: setOrUpdateAvatar } = userApi.setOrUpdateAvatar()
  const { mutate: deleteAvatar } = userApi.deleteAvatar()

  useEffect(() => {}, [])

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

    setOrUpdateAvatar(file, {
      onSuccess: data => {
        dismiss()
        setAvatarSrc(data.url)
        setMenuOpen(false)
        toast({
          variant: 'defaultBlueSuccess',
          description: 'Аватар успешно изменен!',
        })
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response?.data as { detail?: string }
          toast({
            title: 'Ошибка при изменении аватара',
            description: errorData.detail,
            variant: 'destructive',
          })
        }
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
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response?.data as { detail?: string }
          toast({
            title: 'Ошибка при удалении аватара',
            description: errorData.detail,
            variant: 'destructive',
          })
        }
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
