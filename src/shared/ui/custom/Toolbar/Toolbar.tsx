import React from 'react'
import styles from './Toolbar.module.scss'
import clsx from 'clsx'

interface ToolbarProps {
  className?: string
  children: React.ReactNode
}

const Toolbar = ({ children, className }: ToolbarProps) => {
  return <div className={clsx(styles.toolbar, className)}>{children}</div>
}

export default Toolbar
