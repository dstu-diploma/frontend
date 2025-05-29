'use client'

import { useHackathons } from '../../../hooks/useHackathons'
import HackathonList from './HackathonList'
import UserCardSkeleton from '@/shared/ui/custom/skeletons/UserCardSkeleton'
import styles from './HackathonList.module.scss'

export const HackathonListContainer = () => {
  const { isHackathonsLoading } = useHackathons()

  if (isHackathonsLoading) {
    return (
      <div className={styles.container}>
        <h4>Список хакатонов</h4>
        <div className={styles.skeletonContainer}>
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h4>Список хакатонов</h4>
      <HackathonList />
    </div>
  )
}
