'use client'

import React from 'react'
import { SheetTrigger, SheetContent } from '@/shared/ui/shadcn/sheet'
import { Link, Sheet } from 'lucide-react'
import { useSidebar } from '../hooks/useSidebar'
import styles from './Sidebar.module.css'
import clsx from 'clsx'

interface MobileSidebarProps {
  trigger: React.ReactNode
}

const MobileSidebar = ({ trigger }: MobileSidebarProps) => {
  const { pathname, handleLogout, processedNavigationItems } = useSidebar()
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
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
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
