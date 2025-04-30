'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { removeAuthCookies } from '@/shared/lib/helpers/cookies';
import { navigationItems } from '../configs/navItemsConfig';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    removeAuthCookies();
    router.push('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navigationItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.active : ''
                }`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <footer className={styles.sidebarFooter}>
        <button 
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          <span className={styles.label}>Выйти</span>
        </button>
      </footer>
    </aside>
  );
}; 