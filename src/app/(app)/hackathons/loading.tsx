import LoadingSpinner from '@/shared/ui/custom/LoadingSpinner/LoadingSpinner'
import styles from '../loading.module.scss'

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <LoadingSpinner />
    </div>
  )
}
