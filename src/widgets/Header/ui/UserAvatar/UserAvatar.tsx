'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Username } from '@/providers/UsernameProvider'
import { useAvatar } from '@/providers/AvatarProvider'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import styles from './UserAvatar.module.scss'
import { useUsername } from '@/providers/UsernameProvider'

interface UserAvatarProps {
  username: Username | null
}

export default function UserAvatar({ username }: UserAvatarProps) {
  const { avatarSrc, isAvatarDeleted } = useAvatar()
  const user = cookiesApi.getUser()
  const { username: usernameFromProvider } = useUsername()
  const [imageError, setImageError] = useState(false)

  const avatarLink = useMemo(() => {
    if (isAvatarDeleted) {
      return null
    }
    if (avatarSrc) {
      return avatarSrc
    }
    if (user?.uploads) {
      const avatarUpload = user.uploads.find(
        (upload: { type?: string }) => upload.type === 'avatar',
      )
      return avatarUpload?.url || null
    }
    return null
  }, [isAvatarDeleted, avatarSrc, user])

  return (
    <div className={styles.avatarWrapper}>
      {avatarLink && !imageError ? (
        <Link href='/profile' className={styles.avatarLinkWrapper}>
          <Image
            src={avatarLink || ''}
            alt='avatar'
            width={40}
            height={40}
            className={styles.avatar}
            priority
            onError={() => setImageError(true)}
          />
        </Link>
      ) : (
        <Link href='/profile' className={styles.avatarPlaceholder}>
          {usernameFromProvider?.first_name?.charAt(0).toUpperCase() || 'U'}
        </Link>
      )}
    </div>
  )
}
