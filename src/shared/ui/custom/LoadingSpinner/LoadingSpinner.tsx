import React from 'react'
import clsx from 'clsx'
import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  className?: string
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return <div className={clsx(styles.loadingSpinner, className)} />
}

export default LoadingSpinner
