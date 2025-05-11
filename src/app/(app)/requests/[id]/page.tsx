'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useRequests } from '@/features/requests/hooks/useRequests'
import { useChatSocket } from '@/features/requests/hooks/useChatSocket'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import styles from './requestPage.module.scss'
import { Button } from '@/shared/ui/shadcn/button'
import { ConfirmModal } from '@/shared/ui/custom/ConfirmModal'

const RequestPage = () => {
  const { id } = useParams()
  const requestId = Number(id)
  const { currentRequest, loadRequestById, handleCloseRequest } = useRequests()
  const [newMessage, setNewMessage] = useState('')
  const currentUser = cookiesApi.getUser()

  const { sendMessage, messages } = useChatSocket(requestId)

  useEffect(() => {
    loadRequestById(requestId)
  }, [])

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (newMessage.trim()) {
        sendMessage(newMessage)
        setNewMessage('')
      }
    },
    [newMessage, sendMessage],
  )

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewMessage(e.target.value)
    },
    [],
  )

  return (
    <div className={styles.requestContainer}>
      <div className={styles.requestContent}>
        <div className={styles.requestContentContainer}>
          <h1 className={styles.requestTitle}>
            Обращение «{currentRequest?.subject}»
          </h1>
          <div className={styles.requestChatWindow}>
            <div className={styles.messagesContainer}>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`${styles.message} ${
                    message.user_id === currentUser?.id
                      ? styles.sent
                      : styles.received
                  }`}
                >
                  <div className={styles.messageContent}>{message.content}</div>
                  <div className={styles.messageTime}>
                    {new Date(message.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSendMessage}
              className={styles.inputContainer}
            >
              <textarea
                className={styles.messageInput}
                value={newMessage}
                onChange={handleMessageChange}
                placeholder='Введите сообщение...'
                rows={1}
              />
              <Button type='submit'>Отправить</Button>
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
                <Button variant='destructive'>Закрыть обращение</Button>
              </ConfirmModal>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestPage
