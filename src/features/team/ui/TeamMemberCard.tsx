import { TeamMember } from '../model/types';
import styles from '../styles/teamcard.module.css'

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        {member.avatarUrl ? (
          <img 
            src={member.avatarUrl} 
            alt={`${member.firstName} ${member.lastName}`}
            className={styles.avatarImage}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {member.firstName.charAt(0)}{member.lastName.charAt(0)}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{member.firstName} {member.lastName}</h3>
        {member.role && <p className={styles.role}>{member.role}</p>}
      </div>
    </div>
  );
};