'use client'

import Link from 'next/link'
import { useUsername } from '@/providers/UsernameContext'
import { userApi } from '@/features/user'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import UserAvatar from './UserAvatar/UserAvatar'
import styles from './Header.module.css'

export const Header = () => {
  const { username } = useUsername()

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
