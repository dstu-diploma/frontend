import React from 'react'
import Image from 'next/image'
import styles from './TeamMemberCardAvatar.module.scss'
import { UserPartial } from '@/features/user/model/types'

interface TeamMemberCardAvatarProps {
  member: UserPartial
}

const TeamMemberCardAvatar = ({ member }: TeamMemberCardAvatarProps) => {
  return (
    <div className={styles.avatarContainer}>
        {member.avatarUrl ? (
          <Image 
            src={'/placeholder.png'} 
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