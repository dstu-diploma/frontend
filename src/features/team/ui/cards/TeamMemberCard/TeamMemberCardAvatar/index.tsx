import React, { useEffect, useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import { userApi } from '@/features/user'
import styles from './TeamMemberCardAvatar.module.scss'
import { TeamMateRef } from '@/features/team/model/types'

interface TeamMemberCardAvatarProps {
  member: TeamMateRef
}

export const TeamMemberCardAvatar = ({ member }: TeamMemberCardAvatarProps) => {
  const [showImage, setShowImage] = useState(false)
  const [isPathValid, setIsPathValid] = useState(false)
  const isFirstRender = useRef(true)

  const avatarUrl = useMemo(() => {
    if (!isPathValid) return ''
    return userApi.getAvatar(member.user_id)
  }, [isPathValid, member.user_id])

  useEffect(() => {
    const checkAvatarPath = async () => {
      const avatarPath = userApi.getAvatar(member.user_id)

      if (isFirstRender.current) {
        const pathIsValid = await userApi.isAvatarExists(avatarPath)
        setIsPathValid(pathIsValid)
        isFirstRender.current = false

        if (pathIsValid) {
          setShowImage(true)
        }
      }
    }
    checkAvatarPath()
  }, [])

  const handleImageError = () => {
    if (isPathValid) {
      const timestamp = Date.now()
      const avatarPath = userApi.getAvatar(member.user_id)
      const urlWithTimestamp = `${avatarPath}?t=${timestamp}`
      const img = new window.Image()
      img.src = urlWithTimestamp
      img.onload = () => {
        setShowImage(true)
      }
    } else {
      setShowImage(false)
    }
  }

  return (
    <div className={styles.avatarContainer}>
      {showImage ? (
        <Image
          src={avatarUrl}
          alt={`${member.user_name}`}
          className={styles.avatarImage}
          width={200}
          height={200}
          onError={handleImageError}
          priority
          loading='eager'
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
