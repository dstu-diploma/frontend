'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Username } from '@/providers/UsernameContext'
import { useAvatar } from '@/features/user/context/AvatarContext'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import styles from './UserAvatar.module.css'

interface UserAvatarProps {
  username: Username | null
}

export default function UserAvatar({ username }: UserAvatarProps) {
  const { avatarSrc, isAvatarDeleted } = useAvatar()
  const user = cookiesApi.getUser()

  const avatarLink = useMemo(() => {
    if (isAvatarDeleted) {
      return null
    }
    if (avatarSrc) {
      return avatarSrc
    }
    if (user && 'uploads' in user) {
      return user?.uploads?.[0]?.url || null
    }
  }, [isAvatarDeleted, avatarSrc, user])

  return (
    <div className={styles.avatarWrapper}>
      {avatarLink ? (
        <Link href='/profile'>
          <Image
            src={avatarLink || ''}
            alt='avatar'
            width={40}
            height={40}
            className={styles.avatar}
            priority
          />
        </Link>
      ) : (
        <Link href='/profile' className={styles.avatarPlaceholder}>
          {username?.first_name?.charAt(0).toUpperCase() || 'U'}
        </Link>
      )}
    </div>
  )
}
