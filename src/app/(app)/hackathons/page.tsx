import { cookies } from 'next/headers'
import HackathonCreateModal from '@/features/hackathons/ui/hackathonsListPage/HackathonCreateModal/HackathonCreateModal'
import HackathonList from '@/features/hackathons/ui/hackathonsListPage/HackathonPage/HackathonList'
import styles from './hackathons.module.scss'

export default async function HackathonsPage() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user')?.value
  const user = userCookie ? JSON.parse(userCookie) : null
  const canCreateHackathons =
    user && (user.role === 'admin' || user.role === 'organizer')

  return (
    <div className={styles.hackathonsContainer}>
      <h1 className={styles.hackathonsTitle}>Хакатоны</h1>
      <div className={styles.hackathonsContent}>
        {canCreateHackathons && <HackathonCreateModal />}
        <HackathonList />
      </div>
    </div>
  )
}
