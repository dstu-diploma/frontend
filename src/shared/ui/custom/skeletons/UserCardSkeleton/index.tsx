import React from 'react'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import styles from './UserCardSkeleton.module.scss'

const UserCardSkeleton = () => {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.avatar} />
      <div className={styles.content}>
        <Skeleton className={styles.line} />
        <Skeleton className={styles.line} />
        <Skeleton className={styles.line} />
      </div>
    </div>
  )
}

export default UserCardSkeleton
