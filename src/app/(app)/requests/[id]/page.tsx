'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { Button } from '@/shared/ui/shadcn/button'
import { ConfirmModal } from '@/shared/ui/custom/modals/ConfirmModal'
import { useSingleRequest } from '@/features/requests/hooks/useSingleRequest'
import styles from './requestPage.module.scss'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import { useRequestPageSocket } from '@/features/requests/hooks/useRequestPageSocket'
import { FullUser } from '@/features/user/model/types'
import RequestMessage from '@/features/requests/ui/RequestMessage'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

const RequestPage = () => {
  const { id } = useParams()
  const requestId = Number(id)
  const { currentRequest } = useSingleRequest(requestId)
  const [messageText, setNewMessageText] = useState('')
  const currentUser = cookiesApi.getUser() as FullUser
  const { handleSendMessage, handleCloseRequest } = useSingleRequest(requestId)

  useRequestPageSocket(requestId)

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessageText(e.target.value)
  }

  if (!currentRequest) {
    return <LayoutFallback text='Загрузка обращения...' />
  }

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const requestPageStyles = clsx(styles.requestContainer, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={requestPageStyles}>
      <div className={styles.requestContent}>
        <div className={styles.requestContentContainer}>
          <h1 className={styles.requestTitle}>
            Обращение «{currentRequest?.subject}» по хакатону «
            {currentRequest?.hackathon_name}»
          </h1>
          <div className={styles.requestChatWindow}>
            <div className={styles.messagesContainer}>
              {currentRequest?.messages.map(message => (
                <RequestMessage
                  key={message.id}
                  message={message}
                  currentUser={currentUser}
                />
              ))}
            </div>
            <form
              onSubmit={e => {
                e.preventDefault()
                setNewMessageText('')
                handleSendMessage(messageText)
              }}
              className={styles.inputForm}
            >
              {!currentRequest.closed_by_user_id ? (
                <div className={styles.inputContainer}>
                  <textarea
                    className={styles.messageInput}
                    value={messageText}
                    onChange={handleMessageChange}
                    placeholder='Введите сообщение...'
                    rows={1}
                  />
                  <Button
                    className={styles.sendButton}
                    type='submit'
                    disabled={!messageText}
                  >
                    Отправить
                  </Button>
                  <ConfirmModal
                    title='Вы уверены, что хотите закрыть обращение?'
                    submitButtonText='Закрыть'
                    onConfirm={e =>
                      handleCloseRequest(
                        e as React.MouseEvent<HTMLButtonElement>,
                        requestId,
                      )
                    }
                  >
                    <Button
                      className={styles.closeButton}
                      variant='destructive'
                    >
                      Закрыть
                    </Button>
                  </ConfirmModal>
                </div>
              ) : (
                <div className={styles.inputContainer}>
                  <span className={clsx(styles.closed, styles.fullWidth)}>
                    Обращение закрыто
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestPage
