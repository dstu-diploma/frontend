import { TeamInviteCard } from '../TeamInviteCard/TeamInviteCard';
import styles from './TeamSidebar.module.scss'

export const TeamSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBlock}>
        <h4>Информация о команде</h4>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <span className={styles.icon}>Команда:&nbsp;</span>
            <span className={styles.label}>Отряд морских котиков</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.icon}>Участников:&nbsp;</span>
            <span className={styles.label}>3</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.icon}>Хакатон:&nbsp;</span>
            <span className={styles.label}>ДГТУ 2025</span>
          </li>
        </ul>
      </div>
      <div className={styles.sidebarBlock}>
        <h4>Приглашения</h4>
        <div className={styles.invitesContainer}>
          <TeamInviteCard username='Босс качалки' />
          <TeamInviteCard username='Король вмо' />
        </div>
      </div>
    </aside>
  );
};