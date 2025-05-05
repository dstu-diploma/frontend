import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './TeamMemberCardAvatar.module.scss'
import { UserPartial } from '@/features/user/model/types'
import { userApi } from '@/features/user'

interface TeamMemberCardAvatarProps {
  member: UserPartial
}

const TeamMemberCardAvatar = ({ member }: TeamMemberCardAvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    const prepareAvatar = async () => {
      const avatarPath = userApi.getAvatar(member.id)
      const pathIsValid = await userApi.isAvatarExists(avatarPath)

      if (pathIsValid) {
        setAvatarUrl(avatarPath)
      }
    }
    prepareAvatar()
  }, [])

  return (
    <div className={styles.avatarContainer}>
      {avatarUrl ? (
        <Image 
          src={avatarUrl} 
          alt={`${member.first_name} ${member.last_name}`}
          className={styles.avatarImage}
          width={200}
          height={200}
        />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {member.first_name.charAt(0)}{member.last_name.charAt(0)}
        </div>
      )}
    </div>
  )
}

export default TeamMemberCardAvatar