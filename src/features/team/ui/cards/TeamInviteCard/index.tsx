import React from 'react';
import { Button } from '@/shared/ui/shadcn/button';
import styles from './TeamInviteCard.module.scss'
import { TeamInfo } from '../../../model/types';

interface TeamInviteCardProps {
  team: TeamInfo
  onAccept: (team_id: number) => void;
  onReject: (team_id: number) => void;
};

export const TeamInviteCard: React.FC<TeamInviteCardProps> = ({
  team,
  onAccept,
  onReject,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.userData}>
        <span className={styles.username}>Приглашение в команду {team.name}</span>
      </div>
      <div className={styles.inviteControls}>
        <Button
          value='submit'
          size='sm'
          onClick={() => onAccept(team.id)}
        >
          Принять
        </Button>
        <Button
          variant='destructive'
          size='sm'
          onClick={() => onReject(team.id)}
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
};