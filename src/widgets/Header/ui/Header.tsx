'use client'

import Link from 'next/link'
import { Username, useUsername } from '@/providers/UsernameContext'
import UserAvatar from './UserAvatar/UserAvatar'
import styles from './Header.module.css'
import { useState, useEffect } from 'react'

export const Header = () => {
  const { username: contextUsername } = useUsername()
  const [username, setUsername] = useState<Username | null>(null)

  useEffect(() => {
    setUsername(contextUsername)
  }, [contextUsername])

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href='/' className={styles.brand}>
          <h1 className={styles.brandTitle}>Packathon</h1>
        </Link>
        <div className={styles.userInfo}>
          <Link href='/profile' className={styles.userName}>
            <span>
              {username?.first_name &&
                username?.last_name &&
                `${username.first_name} ${username.last_name}`}
            </span>
          </Link>
          <div className={styles.avatarWrapper}>
            <UserAvatar username={username} />
          </div>
        </div>
      </div>
    </header>
  )
}
