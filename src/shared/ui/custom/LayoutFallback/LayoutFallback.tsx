import React from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import styles from './LayoutFallback.module.scss'

const LayoutFallback = () => {
  return (
    <div className={styles.fallbackContainer}>
        <LoadingSpinner />
    </div>
  )
}

export default LayoutFallback