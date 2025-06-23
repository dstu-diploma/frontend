'use client'

import React from 'react'
import styles from './RequestCard.module.scss'
import clsx from 'clsx'
import { Request } from '../../model/types'
import { ISOStringToDateString } from '@/shared/lib/helpers/date'
import { Button } from '@/shared/ui/shadcn/button'
import { useSingleRequest } from '../../hooks/useSingleRequest'
import { useQueryClient } from '@tanstack/react-query'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface RequestCardProps {
  request: Request
  className?: string
}

const RequestCard = ({ request, className }: RequestCardProps) => {
  const queryClient = useQueryClient()
  const { handleCloseRequest } = useSingleRequest(request.id)

  // Мобильные стили
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const requestCardStyles = clsx(styles.card, className, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={requestCardStyles}>
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
        {!request.closed_by_user_id && (
          <Button
            className={styles.closeRequestButton}
            variant='destructive'
            onClick={e => {
              handleCloseRequest(e)
              queryClient.invalidateQueries({ queryKey: ['allRequests'] })
            }}
          >
            Закрыть обращение
          </Button>
        )}
      </div>
    </div>
  )
}

export default RequestCard
