'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { profileApi, userApi } from '@/features/user';
import { Username } from '@/providers/UsernameContext';
import styles from './UserAvatar.module.css'

interface UserAvatarProps {
  username: Username | null
  userAvatarSrc: string
}

export default function UserAvatar({ username, userAvatarSrc }: UserAvatarProps) {
  const [avatarExists, setAvatarExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAvatar = async () => {
      try {
        const exists = await profileApi.isAvatarExists(userAvatarSrc);
        console.log(userAvatarSrc)
        setAvatarExists(exists);
      } catch (error) {
        console.error('Failed to check avatar:', error);
        setAvatarExists(false);
      }
    };
    checkAvatar();
  }, [userAvatarSrc]);

  return (
    <div className={styles.avatarWrapper}>
      {avatarExists ? (
        <Link href="/profile">
          <Image
            src={userAvatarSrc}
            alt="avatar"
            width={40}
            height={40}
            className={styles.avatar}
          />
        </Link>
      ) : (
        <Link href="/profile" className={styles.avatarPlaceholder}>
          {username?.first_name.charAt(0).toUpperCase()}
        </Link>
      )}
    </div>
  );
}