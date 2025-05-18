import React from 'react'
import UserCardSkeleton from '../UserCardSkeleton'
import styles from './EntityLoading.module.scss'

const EntityLoading = () => {
  return (
    <div className={styles.skeletonContainer}>
      <UserCardSkeleton />
      <UserCardSkeleton />
      <UserCardSkeleton />
    </div>
  )
}

export default EntityLoading
