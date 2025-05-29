import React from 'react'
import UserCardSkeleton from '../../skeletons/UserCardSkeleton'
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
