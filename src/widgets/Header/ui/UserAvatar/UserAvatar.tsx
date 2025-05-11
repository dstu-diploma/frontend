'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { userApi } from '@/features/user'
import { Username } from '@/providers/UsernameContext'
import { useAvatar } from '@/features/user/context/AvatarContext'
import styles from './UserAvatar.module.css'

interface UserAvatarProps {
  username: Username | null
}

export default function UserAvatar({ username }: UserAvatarProps) {
  const [avatarExists, setAvatarExists] = useState<boolean | null>(null)
  const { avatarSrc } = useAvatar()

  useEffect(() => {
    const checkAvatar = async () => {
      if (!avatarSrc) {
        setAvatarExists(false)
        return
      }

      try {
        const exists = await userApi.isAvatarExists(avatarSrc)
        console.log('Avatar src:', avatarSrc)
        setAvatarExists(exists)
      } catch (error) {
        console.error('Failed to check avatar:', error)
        setAvatarExists(false)
      }
    }
    checkAvatar()
  }, [avatarSrc])

  return (
    <div className={styles.avatarWrapper}>
      {avatarExists ? (
        <Link href='/profile'>
          <Image
            src={avatarSrc || ''}
            alt='avatar'
            width={40}
            height={40}
            className={styles.avatar}
          />
        </Link>
      ) : (
        <Link href='/profile' className={styles.avatarPlaceholder}>
          {username?.first_name.charAt(0).toUpperCase()}
        </Link>
      )}
    </div>
  )
}
