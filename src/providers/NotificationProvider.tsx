'use client'

import { useEffect } from 'react'
import { notificationService } from '@/shared/lib/services/notification.service'
import { useCustomToast } from '../shared/lib/helpers/toast'

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { showToastSuccess, showToastError, showRawToastError } =
    useCustomToast()

  useEffect(() => {
    const handleNotification = {
      success: (message: string) => {
        showToastSuccess(message)
      },
      error: (error: unknown, message: string) => {
        showToastError(error, message)
      },
      errorRaw: (title: string, description: string) => {
        showRawToastError(title, description)
      },
    }

    notificationService.subscribe(handleNotification)
    return () => notificationService.unsubscribe(handleNotification)
  }, [showToastSuccess, showToastError, showRawToastError])

  return <>{children}</>
}
