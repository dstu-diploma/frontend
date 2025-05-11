import React, { useEffect, useState } from 'react'
import styles from './RequestCard.module.scss'
import clsx from 'clsx'
import { Request } from '../../model/types'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { userApi } from '@/features/user/api'
import { UserPartial } from '@/features/user/model/types'

interface RequestCardProps {
  request: Request
  className?: string
}

const RequestCard = ({ request, className }: RequestCardProps) => {
  const [author, setAuthor] = useState<UserPartial | null>(null)
  const { mutate: getSingleUser } = userApi.getSingleUser()

  useEffect(() => {
    getSingleUser(request.author_user_id, {
      onSuccess: data => {
        setAuthor(data)
      },
    })
  }, [request.author_user_id])

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={styles.basicInfo}>
            <h5 className={styles.name}>{request.subject}</h5>
            {author && (
              <div className={styles.paramBlock}>
                <span className={styles.defaultParam}>Отправитель:&nbsp;</span>
                <span className={styles.defaultParamValue}>
                  {author.first_name} {author.last_name}
                </span>
              </div>
            )}
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
          <div className={styles.dateCreated}>
            <span className={styles.param}>Дата создания</span>
            <span className={styles.value}>
              {ISOStringToDateString(request.create_date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestCard
