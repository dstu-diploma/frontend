import { UserPartial } from '@/features/user/model/types';
import { TeamInfo } from '../../../model/types';
import styles from './TeamSidebar.module.scss'

interface TeamSidebarProps {
  team: TeamInfo
  teamMates: UserPartial[] | null
}

export const TeamSidebar = ({ team, teamMates }: TeamSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBlock}>
        <h4>Информация о команде</h4>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <span className={styles.param}>Команда&nbsp;</span>
            <span className={styles.value}>{team.name}</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Участников&nbsp;</span>
            <span className={styles.value}>{team?.mates.length}</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Хакатон&nbsp;</span>
            <span className={styles.value}>ДГТУ 2025</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};