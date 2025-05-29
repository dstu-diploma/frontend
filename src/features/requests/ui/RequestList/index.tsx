import React, { useCallback } from 'react'
import Link from 'next/link'
import RequestCard from '../RequestCard'
import { type Request } from '@/features/requests/model/types'
import styles from './RequestList.module.scss'

interface RequestsListProps {
  requests: Request[] | undefined
  type: 'opened' | 'closed'
}

const RequestList = ({ requests, type }: RequestsListProps) => {
  // Функция для рендера карточки обращения
  const renderRequest = useCallback(
    (request: Request) => (
      <Link
        className={styles.requestLink}
        href={`/requests/${request.id}`}
        key={request.id}
      >
        <RequestCard request={request} />
      </Link>
    ),
    [],
  )

  return (
    <div className={styles.requestsList}>
      {requests && requests?.length > 0 ? (
        requests?.map(renderRequest)
      ) : (
        <span>Нет {type === 'opened' ? 'активных' : 'закрытых'} обращений</span>
      )}
    </div>
  )
}

export default RequestList
