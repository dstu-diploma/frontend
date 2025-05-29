import React from 'react'
import styles from './RequestCard.module.scss'
import clsx from 'clsx'
import { Request } from '../../model/types'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'

interface RequestCardProps {
  request: Request
  className?: string
}

const RequestCard = ({ request, className }: RequestCardProps) => {
  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={styles.basicInfo}>
            <h5 className={styles.name}>{request.subject}</h5>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>ID обращения:&nbsp;</span>
              <span className={styles.defaultParamValue}>{request.id}</span>
            </div>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>Дата создания:&nbsp;</span>
              <span className={styles.defaultParamValue}>
                {ISOStringToDateString(request.create_date)}
              </span>
            </div>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>Отправитель:&nbsp;</span>
              <span className={styles.defaultParamValue}>
                {request.author_name}
              </span>
            </div>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>Хакатон:&nbsp;</span>
              <span className={styles.defaultParamValue}>
                {request.hackathon_name}
              </span>
            </div>
            <div className={styles.paramBlock}>
              <span className={styles.defaultParam}>Cтатус:&nbsp;</span>
              <span
                className={
                  request.closed_by_user_id === null
                    ? styles.successParamValue
                    : styles.closedParamValue
                }
              >
                {request.closed_by_user_id ? 'Закрыто' : 'Открыто'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestCard
