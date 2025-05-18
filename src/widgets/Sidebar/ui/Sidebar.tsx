'use client'

import Link from 'next/link'
import clsx from 'clsx'
import styles from './Sidebar.module.scss'
import { useSidebar } from '../hooks/useSidebar'

export const Sidebar = () => {
  const { pathname, handleLogout, processedNavigationItems } = useSidebar()

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {processedNavigationItems.map(item => (
            <li key={item.href} className={styles.navItem}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.active : ''
                }`}
              >
                <span
                  className={clsx(
                    styles.icon,
                    item.isIconFillable && styles.iconFill,
                  )}
                >
                  {item.icon}
                </span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <footer className={styles.sidebarFooter}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <span className={styles.label}>Выйти</span>
        </button>
      </footer>
    </aside>
  )
}
