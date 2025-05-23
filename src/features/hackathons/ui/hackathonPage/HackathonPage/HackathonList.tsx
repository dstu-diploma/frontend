'use client'

import React from 'react'
import UserCardSkeleton from '@/shared/ui/custom/UserCardSkeleton'
import Link from 'next/link'
import { useHackathons } from '../../../hooks/useHackathons'
import { HackathonListCard } from '../../cards/HackathonListCard'
import styles from './HackathonList.module.scss'

const HackathonList = () => {
  const { allHackathons, isHackathonsLoading } = useHackathons()

  return (
    <div className={styles.hackathons}>
      <h4>Список хакатонов</h4>
          {isHackathonsLoading ? (
            <div className={styles.skeletonContainer}>
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
            </div>
          ) : (
            <div className={styles.hackathonsList}>
              {allHackathons && allHackathons.length > 0 ? (
                allHackathons.map(hackathon => (
                  <Link
                    key={hackathon.id}
                    href={`/hackathons/${hackathon.id}`}
                    className={styles.hackathonLink}
                  >
                    <HackathonListCard
                      key={hackathon.id}
                      hackathon={hackathon}
                    />
                  </Link>
                ))
              ) : (
                <span>Нет объявленных хакатонов</span>
              )}
            </div>
          )}
        </div>
  )
}

export default HackathonList