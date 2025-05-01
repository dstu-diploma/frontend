import { mockTeamMembers } from '@/features/team/model/mockData';
import { TeamMemberCard } from '@/features/team/ui/TeamMemberCard';
import styles from './team.module.css';

export default function TeamsPage() {
  return (
    <div className={styles.teamContainer}>
      <div className={styles.teamContent}>
        <h1 className={styles.teamTitle}>Моя команда</h1>
        <div className={styles.teamMembers}>
          <h3>Участники команды</h3>
          <div className={styles.grid}>
            {mockTeamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}