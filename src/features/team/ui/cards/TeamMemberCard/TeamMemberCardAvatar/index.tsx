import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { TeamMateRef } from '@/features/team/model/types'
import styles from './TeamMemberCardAvatar.module.scss'
import { cookiesApi } from '@/shared/lib/helpers/cookies'

interface TeamMemberCardAvatarProps {
  member: TeamMateRef
}

export const TeamMemberCardAvatar = ({ member }: TeamMemberCardAvatarProps) => {
  const [imageError, setImageError] = useState(false)

  const avatarUrl = useMemo(() => {
    if (member && member.user_uploads.length > 0) {
      const avatarUpload = member.user_uploads.find(
        upload => upload.type === 'avatar',
      )
      return avatarUpload?.url || null
    }
    return null
  }, [member])

  const user = cookiesApi.getUser()
  console.log(user)

  return (
    <div className={styles.avatarContainer}>
      {avatarUrl && !imageError ? (
        <Image
          src={avatarUrl}
          alt={`${member.user_name}`}
          className={styles.avatarImage}
          width={200}
          height={200}
          priority
          loading='eager'
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {member.user_name.split(' ')[0].charAt(0)}
          {member.user_name.split(' ')[1].charAt(0)}
        </div>
      )}
    </div>
  )
}

export default TeamMemberCardAvatar
