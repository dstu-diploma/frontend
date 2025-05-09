'use client'

import { hackathonApi } from '@/features/hackatons/api'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './hackathonPage.module.scss'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { DetailedHackathon } from '@/features/hackatons/model/types'

const HackathonPage = () => {
  const { id } = useParams()
  const { mutate: getHackathonById, isPending: isHackathonLoading } =
    hackathonApi.getHackathonById()
  const [hackathonInfo, setHackathonInfo] = useState<DetailedHackathon | null>(
    null,
  )

  useEffect(() => {
    getHackathonById(Number(id), {
      onSuccess: data => setHackathonInfo(data),
    })
  }, [id])

  return (
    <div className={styles.hackathonPageContainer}>
      {isHackathonLoading ? (
        <span>Загрузка информации о хакатоне...</span>
      ) : (
        <div className={styles.hackathonPageContent}>
          <h1>Хакатон «{hackathonInfo?.name}»</h1>
          <div className={styles.hackathonPageInfo}>
            <h4>Основная информация</h4>
            <Toolbar>
              <div className={styles.hackathonBasicInfo}>
                <div className={styles.hackathonPageInfoItem}>
                  <span className={styles.hackathonPageInfoItemTitle}>
                    Дата начала
                  </span>
                  <span className={styles.hackathonPageInfoItemValue}>
                    {ISOStringToDateString(hackathonInfo?.start_date)}
                  </span>
                </div>
                <div className={styles.hackathonPageInfoItem}>
                  <span className={styles.hackathonPageInfoItemTitle}>
                    Количество команд-участников
                  </span>
                  <span className={styles.hackathonPageInfoItemValue}>
                    {hackathonInfo?.teams.length}
                  </span>
                </div>
                <div className={styles.hackathonPageInfoItem}>
                  <span className={styles.hackathonPageInfoItemTitle}>
                    Дата начала оценивания
                  </span>
                  <span className={styles.hackathonPageInfoItemValue}>
                    {ISOStringToDateString(hackathonInfo?.score_start_date)}
                  </span>
                </div>
                <div className={styles.hackathonPageInfoItem}>
                  <span className={styles.hackathonPageInfoItemTitle}>
                    Дата окончания
                  </span>
                  <span className={styles.hackathonPageInfoItemValue}>
                    {ISOStringToDateString(hackathonInfo?.end_date)}
                  </span>
                </div>
              </div>
            </Toolbar>
          </div>
        </div>
      )}
    </div>
  )
}

export default HackathonPage
