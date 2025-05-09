import React, { useEffect, useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import { UserPartial } from '@/features/user/model/types'
import { userApi } from '@/features/user'
import styles from './TeamMemberCardAvatar.module.scss'

interface TeamMemberCardAvatarProps {
  member: UserPartial
}

export const TeamMemberCardAvatar = ({ member }: TeamMemberCardAvatarProps) => {
  const [showImage, setShowImage] = useState(false)
  const [isPathValid, setIsPathValid] = useState(false)
  const isFirstRender = useRef(true)

  const avatarUrl = useMemo(() => {
    if (!isPathValid) return ''
    return userApi.getAvatar(member.id)
  }, [isPathValid, member.id])

  useEffect(() => {
    const checkAvatarPath = async () => {
      const avatarPath = userApi.getAvatar(member.id)

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
      const avatarPath = userApi.getAvatar(member.id)
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
          alt={`${member.first_name} ${member.last_name}`}
          className={styles.avatarImage}
          width={200}
          height={200}
          onError={handleImageError}
          priority
          loading='eager'
        />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {member.first_name.charAt(0)}
          {member.last_name.charAt(0)}
        </div>
      )}
    </div>
  )
}

export default TeamMemberCardAvatar
