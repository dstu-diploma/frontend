'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { navigationItems, NavItem } from '../configs/navItemsConfig'
import styles from './Sidebar.module.css'
import clsx from 'clsx'

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const user = cookiesApi.getUser()

  const handleLogout = () => {
    cookiesApi.removeAuthCookies()
    router.push('/login')
  }

  const processNavigationItems = navigationItems.filter((item: NavItem) => {
    if (item.href === '/admin' && user.role !== 'admin') {
      return false
    }

    if (item.href === '/team' && user.role !== 'user') {
      return false
    }

    return true
  })

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {processNavigationItems.map(item => (
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
