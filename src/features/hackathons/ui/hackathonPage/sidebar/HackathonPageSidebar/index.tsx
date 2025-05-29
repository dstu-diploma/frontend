import React from 'react'
import styles from './HackathonPageSidebar.module.scss'

interface HackathonPageSidebarProps {
  children: React.ReactNode
  actions?: React.ReactNode
  title: string
}

const HackathonPageSidebar = ({
  children,
  title,
  actions,
}: HackathonPageSidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarSection}>
          <h4>{title}</h4>
          {children}
        </div>
        {actions}
      </div>
    </div>
  )
}

export default HackathonPageSidebar
