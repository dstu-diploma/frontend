'use client'

import { Camera, Trash2 } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/shadcn/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui/shadcn/dropdown'
import { User } from '../../../model/types'
import { useProfileAvatar } from '../../../hooks/profile/useProfileAvatar'
import styles from './ProfileAvatar.module.scss'
import { useMemo } from 'react'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useAvatar } from '@/providers/AvatarProvider'

interface ProfileAvatarProps {
  profile: User
}

export function ProfileAvatar({ profile }: ProfileAvatarProps) {
  const {
    menuOpen,
    setMenuOpen,
    fileInputRef,
    avatarSrc,
    setAvatarSrc,
    handleAvatarChange,
    handleDeleteAvatar,
  } = useProfileAvatar()
  const { isAvatarDeleted } = useAvatar()
  const user = cookiesApi.getUser()

  const avatarLink = useMemo(() => {
    if (isAvatarDeleted) {
      return null
    }
    if (avatarSrc) {
      return avatarSrc
    }
    if (user && 'uploads' in user) {
      return user?.uploads?.[0]?.url
    }
    return null
  }, [avatarSrc, isAvatarDeleted, user])

  const profileData = useMemo(() => {
    if (!profile) {
      return {
        register_date: '',
        role: '',
        birthday: '',
        about: '',
        first_name: '',
        last_name: '',
        patronymic: '',
        email: '',
      }
    }
    return {
      ...profile,
    }
  }, [profile])

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild className={styles.profileAvatarTrigger}>
        <button
          className={styles.profileAvatarTriggerButton}
          onClick={e => {
            e.preventDefault()
            setMenuOpen(prev => !prev)
          }}
        >
          <Avatar
            key={avatarLink || 'fallback'}
            className={styles.profileAvatarBlock}
          >
            {avatarLink ? (
              <AvatarImage
                src={avatarLink}
                alt='User avatar'
                width={150}
                height={150}
                className={styles.profileAvatarImage}
                onError={() => {
                  setAvatarSrc(null)
                }}
              />
            ) : (
              <AvatarFallback className={styles.profileAvatarFallback}>
                <span>{profileData.first_name?.[0]?.toUpperCase() || '?'}</span>
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem
          className={styles.dropdownMenuItem}
          onSelect={e => {
            e.preventDefault()
            fileInputRef.current?.click()
          }}
        >
          <Camera />
          <span>Добавить фото</span>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleAvatarChange}
            className={styles.dropdownFileInput}
            style={{ display: 'none' }}
          />
        </DropdownMenuItem>
        {avatarLink && (
          <DropdownMenuItem
            onSelect={e => {
              e.preventDefault()
              handleDeleteAvatar()
            }}
            className={styles.dropdownMenuItem}
          >
            <Trash2 />
            <span>Удалить фото</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
