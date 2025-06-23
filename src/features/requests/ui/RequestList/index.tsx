import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import RequestCard from '../RequestCard'
import { type Request } from '@/features/requests/model/types'
import styles from './RequestList.module.scss'
import RequestListSearch from '../RequestsListSearch'

interface RequestsListProps {
  requests: Request[] | undefined
  type: 'opened' | 'closed'
}

const RequestList = ({ requests, type }: RequestsListProps) => {
  const [searchQuery, setSearchQuery] = React.useState('')

  // Фильтрация обращений по поисковому запросу
  const filteredRequests = useMemo(() => {
    if (!requests) return []
    if (!searchQuery) return requests

    const query = searchQuery.toLowerCase()
    return requests.filter(request => 
      request.subject.toLowerCase().includes(query) ||
      request.author_name.toLowerCase().includes(query) ||
      request.hackathon_name.toLowerCase().includes(query) ||
      request.id.toString().includes(query)
    )
  }, [requests, searchQuery])

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
    <div className={styles.requestsListContainer}>
      {(requests && requests.length !== 0) && <RequestListSearch onSearch={setSearchQuery} />}
      <div className={styles.requestsList}>
        {filteredRequests && filteredRequests.length > 0 ? (
          filteredRequests.map(renderRequest)
        ) : (
          <span className={styles.noRequests}>
            {searchQuery 
              ? 'По вашему запросу ничего не найдено' 
              : `Нет ${type === 'opened' ? 'активных' : 'закрытых'} обращений`}
          </span>
        )}
      </div>
    </div>
  )
}

export default RequestList
