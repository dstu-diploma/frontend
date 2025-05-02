import Image from 'next/image'
import { TeamMember } from '../../model/types';
import styles from './TeamMemberCard.module.scss'

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        {member.avatarUrl ? (
          <Image 
            src={'/placeholder.png'} 
            alt={`${member.firstName} ${member.lastName}`}
            className={styles.avatarImage}
            width={200}
            height={200}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {member.firstName.charAt(0)}{member.lastName.charAt(0)}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h4 className={styles.name}>{member.firstName} {member.lastName}</h4>
        {member.role && <p className={styles.role}>{member.role}</p>}
      </div>
    </div>
  );
};