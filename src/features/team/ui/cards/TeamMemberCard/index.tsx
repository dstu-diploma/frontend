import styles from './TeamMemberCard.module.scss'
import { UserPartial } from '@/features/user/model/types';
import TeamMemberCardAvatar from './TeamMemberCardAvatar';
import { Button } from '@/shared/ui/shadcn/button';
import { cookiesApi } from '@/shared/lib/helpers/cookies';
import { TeamConfirmModal } from '../../modals/TeamConfirmModal';
import { useTeam } from '@/features/team/hooks/useTeam';

interface TeamMemberCardProps {
  member: UserPartial;
  isCaptain: boolean;
}

export const TeamMemberCard = ({ member, isCaptain }: TeamMemberCardProps) => {
  const user = cookiesApi.getUser()
  const { handleTeamKick, handleChangeCaptain } = useTeam()
  
  return (
    <div className={styles.card}>
      <div className={styles.mateInfo}>
        <TeamMemberCardAvatar member={member} />
        <div className={styles.info}>
          <h4 className={styles.name}>{member.first_name} {member.last_name}</h4>
          <p className={styles.role}>
            {member.is_captain && 'Капитан, '}{member?.role_desc ? member?.role_desc: 'Роль в команде не указана'}
          </p>
        </div>
      </div>
      {member.id !== user.id && isCaptain &&
        <div 
          className={styles.captainControls}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <TeamConfirmModal
            title={`Назначить пользователя ${member.first_name} ${member.last_name} капитаном?`}
            submitButtonText='Назначить'
            onConfirm={event => handleChangeCaptain(event, member.id)}
          >
            <Button>Установить капитаном</Button>
          </TeamConfirmModal>
          <TeamConfirmModal
            title='Вы действительно хотите исключить данного пользователя?'
            submitButtonText='Покинуть'
            onConfirm={event => handleTeamKick(event, member.id)}
          >
            <Button 
              variant='destructive'
              className={styles.kickButton}
            >Исключить</Button> 
          </TeamConfirmModal>
        </div>
      }
    </div>
  );
};