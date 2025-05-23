import HackathonList from '@/features/hackathons/ui/hackathonPage/HackathonPage/HackathonList'
import HackathonCreateModal from '@/features/hackathons/ui/hackathonPage/HackathonCreateModal/HackathonCreateModal'
import styles from './hackathons.module.scss'
import { cookies } from 'next/headers'

const HackathonsPage = async () => {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user')?.value
  const user = userCookie ? JSON.parse(userCookie) : null
  const canCreateHackathons = user && (user.role === 'admin' || user.role === 'organizer')

  return (
    <div className={styles.hackathonsContainer}>
      <h1 className={styles.hackathonsTitle}>Хакатоны</h1>
      <div className={styles.hackathonsContent}>
        {canCreateHackathons && (
          <HackathonCreateModal />
        )}
        <HackathonList />
      </div>
    </div>
  )
}

export default HackathonsPage

