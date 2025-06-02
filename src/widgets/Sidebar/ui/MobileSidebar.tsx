'use client'

import React from 'react'
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
} from '@/shared/ui/shadcn/sheet'
import { useSidebar } from '../hooks/useSidebar'
import styles from './Sidebar.module.scss'
import clsx from 'clsx'
import Link from 'next/link'

interface MobileSidebarProps {
  children: React.ReactNode
}

const MobileSidebar = ({ children }: MobileSidebarProps) => {
  const { pathname, handleLogout, processedNavigationItems } = useSidebar()
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side='left' className={styles.mobileSidebar}>
        <div className={styles.sidebar}>
          <nav className={styles.navigation}>
            <ul className={styles.navList}>
              {processedNavigationItems.map(item => (
                <li key={item.href} className={styles.navItem}>
                  <SheetClose asChild>
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
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
          <footer className={styles.sidebarFooter}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <span className={styles.label}>Выйти</span>
            </button>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
