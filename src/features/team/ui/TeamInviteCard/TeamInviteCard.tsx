import React from 'react';
import Image from 'next/image'
import { Button } from '@/shared/ui/shadcn/button';
import styles from './TeamInviteCard.module.scss'

interface TeamInviteCardProps {
  username: string;
  onAccept?: () => void;
  onReject?: () => void;
};

export const TeamInviteCard: React.FC<TeamInviteCardProps> = ({
  username,
  onAccept,
  onReject,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.userData}>
        <div className={styles.avatarContainer}>
          <Image 
            src={'/placeholder.png'} 
            alt={`залупа`}
            className={styles.avatarImage}
            width={200}
            height={200}
          />
        </div>
        <span className={styles.username}>{username}</span>
      </div>
      <div className={styles.inviteControls}>
        <Button
          value='submit'
          size='sm'
          onClick={onAccept}
        >
          Принять
        </Button>
        <Button
          variant='destructive'
          size='sm'
          onClick={onReject}
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
};