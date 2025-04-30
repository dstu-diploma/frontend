import React from 'react'
import styles from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingSpinner} />
      </div>
    </div>
  )
}

export default LoadingSpinner