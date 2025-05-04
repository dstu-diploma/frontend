import styles from './TeamMemberCard.module.scss'
import { UserPartial } from '@/features/user/model/types';
import TeamMemberCardAvatar from './TeamMemberCardAvatar';

interface TeamMemberCardProps {
  member: UserPartial;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <div className={styles.card}>
      <TeamMemberCardAvatar member={member} />
      <div className={styles.info}>
        <h4 className={styles.name}>{member.first_name} {member.last_name}</h4>
        {member.is_captain && <p className={styles.role}>{member.role}</p>}
      </div>
    </div>
  );
};