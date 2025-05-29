import React from 'react'
import Image from 'next/image'
import styles from './RequestMessage.module.scss'
import { ChatMessage } from '../../model/types'
import { FullUser } from '@/features/user/model/types/user'
import { formatToDateTime } from '@/shared/lib/helpers/date'

interface RequestMessageProps {
  message: ChatMessage
  currentUser: FullUser
}

const RequestMessage = ({ message, currentUser }: RequestMessageProps) => {
  const userAvatar = message.user_uploads?.find(
    upload => upload.type === 'avatar',
  )?.url
  const isCurrentUser = message.user_id === currentUser?.id

  return (
    <div
      key={message.id}
      className={`${styles.message} ${
        isCurrentUser ? styles.sent : styles.received
      }`}
    >
      <div className={styles.messageUserInfo}>
        {userAvatar && (
          <Image
            src={userAvatar}
            alt={isCurrentUser ? 'Я' : message.user_name}
            className={styles.userAvatar}
            width={32}
            height={32}
          />
        )}
        <span
          className={
            isCurrentUser ? styles.userNameSent : styles.userNameReceived
          }
        >
          {isCurrentUser
            ? `${currentUser.last_name} ${currentUser.first_name} ${currentUser.patronymic}`
            : message.user_name}
        </span>
      </div>
      <div className={styles.messageContent}>{message.message}</div>
      <div className={styles.messageTime}>
        {formatToDateTime(message.send_date)}
      </div>
    </div>
  )
}

export default RequestMessage
