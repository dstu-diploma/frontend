import React from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import styles from './LayoutFallback.module.scss'

interface LayoutFallbackProps {
  text?: string
}

const LayoutFallback = ({ text }: LayoutFallbackProps) => {
  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.fallbackContents}>
        <LoadingSpinner />
        {text && <p>{text}</p>}
      </div>
    </div>
  )
}
export default LayoutFallback
