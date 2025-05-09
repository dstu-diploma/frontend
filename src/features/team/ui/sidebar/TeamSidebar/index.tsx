import { TeamInfo } from '../../../model/types';
import styles from './TeamSidebar.module.scss'

interface TeamSidebarProps {
  team: TeamInfo
  teamName: string
}

export const TeamSidebar = ({ team, teamName }: TeamSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBlock}>
        <h4>Информация о команде</h4>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <span className={styles.param}>Команда&nbsp;</span>
            <span className={styles.value}>{teamName}</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Участников&nbsp;</span>
            <span className={styles.value}>{team?.mates.length}</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.param}>Хакатон&nbsp;</span>
            <span className={styles.value}>Не указан</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};