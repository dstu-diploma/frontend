'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

interface HeaderProps {
  user: {
    name: string;
    avatar?: string;
  };
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.brand}>
          <h1 className={styles.brandTitle}>Packathon</h1>
        </Link>

        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <div className={styles.avatarWrapper}>
            {user.avatar ? (
              <Link href="/profile">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              </Link>
            ) : (
              <Link href="/profile" className={styles.avatarPlaceholder}>
                {user.name.charAt(0).toUpperCase()}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 