'use client';

import { Camera, Trash2 } from 'lucide-react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/ui/shadcn/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui/shadcn/dropdown';
import { User } from '../../../model/types';
import { useProfileAvatar } from '../../../hooks/profile/useProfileAvatar';
import styles from './ProfileAvatar.module.scss';

interface ProfileAvatarProps {
  profile: User;
}

export function ProfileAvatar({ profile }: ProfileAvatarProps) {
  const {
    menuOpen,
    setMenuOpen,
    fileInputRef,
    avatarSrc, 
    handleAvatarChange,
    handleDeleteAvatar
  } = useProfileAvatar()

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild className={styles.profileAvatarTrigger}>
        <button
          className={styles.profileAvatarTriggerButton}
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen((prev) => !prev);
          }}
        >
          <Avatar key={avatarSrc || 'fallback'} className={styles.profileAvatarBlock}>
            {avatarSrc ? (
              <AvatarImage
                src={avatarSrc}
                alt="User avatar"
                onError={() => {
                  handleDeleteAvatar();
                }}
              />
            ) : (
              <AvatarFallback className={styles.profileAvatarFallback}>
                <span>{profile.first_name?.[0]?.toUpperCase() || '?'}</span>
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
      >
        <DropdownMenuItem
          className={styles.dropdownMenuItem}
          onSelect={(e) => {
            e.preventDefault();
            fileInputRef.current?.click();
          }}
        >
          <Camera />
          <span>Добавить фото</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className={styles.dropdownFileInput}
            style={{ display: 'none' }}
          />
        </DropdownMenuItem>
        {avatarSrc && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleDeleteAvatar();
            }}
            className={styles.dropdownMenuItem}
          >
            <Trash2 />
            <span>Удалить фото</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
