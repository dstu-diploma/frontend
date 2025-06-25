'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { useHackathons } from '../../../hooks/useHackathons'
import HackathonListCard from '../../cards/HackathonListCard'
import styles from './HackathonList.module.scss'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import { Hackathon } from '@/features/hackathons/model/types'

const HackathonList = () => {
  const { allHackathons, isHackathonsLoading } = useHackathons()

  const renderHackathonCard = useCallback(
    (hackathon: Hackathon) => (
      <Link
        key={hackathon.id}
        href={`/hackathons/${hackathon.id}`}
        className={styles.hackathonLink}
      >
        <HackathonListCard hackathon={hackathon} />
      </Link>
    ),
    [],
  )

  if (isHackathonsLoading) {
    return <LayoutFallback text='Загрузка списка хакатонов' />
  }

  return (
    <div className={styles.hackathons}>
      <div className={styles.hackathonsList}>
        {allHackathons && allHackathons.length > 0 ? (
          allHackathons.map(renderHackathonCard)
        ) : (
          <span>Нет объявленных хакатонов</span>
        )}
      </div>
    </div>
  )
}

export default HackathonList
