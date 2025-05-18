import React from 'react'
import styles from './HackathonPageOptionCard.module.scss'
import { UserPartial } from '@/features/user/model/types'
import { userApi } from '@/features/user'
import { Criterion } from '@/features/hackathons/model/types'

interface HackathonPageOptionCardProps {
  item: UserPartial | Criterion
  children?: React.ReactNode
  className?: string
}

export const HackathonPageOptionCard = ({
  item,
  children,
}: HackathonPageOptionCardProps) => {
  const avatarPath = userApi.getAvatar(item.id)
  const isAvatar = 'first_name' in item
  const title =
    'first_name' in item ? `${item.first_name} ${item.last_name}` : item.name

  return (
    <div key={item.id} className={styles.item}>
      {isAvatar ? (
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src={avatarPath || '/default-avatar.png'} alt={title} />
          </div>
          <div className={styles.titleBlock}>
            <h5 className={styles.personName}>{title}</h5>
          </div>
        </div>
      ) : (
        <h5 className={styles.name}>{title}</h5>
      )}
      {children}
    </div>
  )
}
