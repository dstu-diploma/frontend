import { TeamInfo } from '../../../model/types';
import styles from './TeamSidebar.module.scss'

interface TeamSidebarProps {
  team: TeamInfo
}

export const TeamSidebar = ({ team }: TeamSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBlock}>
        <h4>Информация о команде</h4>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <span className={styles.icon}>Команда:&nbsp;</span>
            <span className={styles.label}>{team.name}</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.icon}>Капитан:&nbsp;</span>
            <span className={styles.label}>{team?.mates.length}</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.icon}>Участников:&nbsp;</span>
            <span className={styles.label}>{team?.mates.length}</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.icon}>Хакатон:&nbsp;</span>
            <span className={styles.label}>ДГТУ 2025</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};