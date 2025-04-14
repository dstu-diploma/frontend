'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navigationItems = [
  {
    label: 'Главная',
    href: '/',
    icon: '🏠'
  },
  {
    label: 'Хакатоны',
    href: '/hackathons',
    icon: '🎯'
  },
  {
    label: 'Мои команды',
    href: '/teams',
    icon: '👥'
  },
  {
    label: 'Проекты',
    href: '/projects',
    icon: '📋'
  },
  {
    label: 'Настройки',
    href: '/settings',
    icon: '⚙️'
  }
];

export const Sidebar = () => {
  const pathname = usePathname();

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
    </aside>
  );
}; 