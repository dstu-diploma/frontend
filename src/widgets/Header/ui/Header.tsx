'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { useUsername } from '@/providers/UsernameContext';

export const Header = () => {
  const { username } = useUsername()
  
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
            {/* {user?.avatar ? (
              <Link href="/profile">
                <Image
                  src={user.avatar}
                  alt={user.first_name}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              </Link>
            ) : ( */}
              <Link href="/profile" className={styles.avatarPlaceholder}>
                {username?.first_name.charAt(0).toUpperCase()}
              </Link>
            {/* )} */}
          </div>
        </div>
      </div>
    </header>
  );
}; 