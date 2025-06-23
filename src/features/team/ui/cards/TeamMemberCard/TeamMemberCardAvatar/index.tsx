import { FC, useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar'
import styles from './TeamMemberCardAvatar.module.scss'
import { userApi } from '@/features/user'

interface TeamMemberCardAvatarProps {
  member: {
    user_id: number
    user_name: string
  }
}

export const TeamMemberCardAvatar: FC<TeamMemberCardAvatarProps> = ({ member }) => {
  const { data: memberExtended, isLoading } = userApi.useGetSingleUser(member.user_id)

  const avatarUrl = useMemo(() => {
    if (!member || !memberExtended) return null
    
    if (memberExtended.uploads?.length > 0) {
      const avatarUpload = memberExtended.uploads.find(
        upload => upload.type === 'avatar',
      )
      return avatarUpload?.url || null
    }
    return null
  }, [member, memberExtended])


  if (isLoading) {
    return (
      <Avatar className={styles.avatarContainer}>
        <AvatarFallback className={styles.avatarFallback}>
          {member.user_name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <Avatar className={styles.avatarContainer}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={member.user_name} />
      ) : (
        <AvatarFallback className={styles.avatarFallback}>
          {member.user_name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default TeamMemberCardAvatar
