'use client';

import Link from 'next/link';
import { useUsername } from '@/providers/UsernameContext';
import { profileApi } from '@/features/user';
import { getAuthCookies } from '@/shared/lib/helpers/cookies';
import UserAvatar from './UserAvatar/UserAvatar';
import styles from './Header.module.css';

export const Header = () => {
  const { username } = useUsername()
  const authCookies = getAuthCookies()
  const userAvatarSrc = profileApi.getAvatar(authCookies.user.id);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.brand}>
          <h1 className={styles.brandTitle}>Packathon</h1>
        </Link>
        <div className={styles.userInfo}>
          <Link href="/profile" className={styles.userName}>
            <span>{username?.first_name && username?.last_name && `${username.first_name} ${username.last_name}`}</span>
          </Link>
          <div className={styles.avatarWrapper}>
            <UserAvatar 
              username={username}
              userAvatarSrc={userAvatarSrc}
            />
          </div>
        </div>
      </div>
    </header>
  );
}; 