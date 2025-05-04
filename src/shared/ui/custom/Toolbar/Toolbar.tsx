import React from 'react'
import styles from './Toolbar.module.scss'

interface ToolbarProps {
  children: React.ReactNode
}

const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      {children}
    </div>
  )
}

export default Toolbar