import styles from './team.module.scss'
import { cookies } from 'next/headers'
import TeamPageContent from '@/features/team/ui/teamPage/TeamPageContent/TeamPageContent'
import { UserPartial } from '@/features/user/model/types'

const TeamsPage = async () => {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user')?.value
  const user = userCookie ? JSON.parse(userCookie) : null

  return (
    <div className={styles.teamContainer}>
      <h1 className={styles.teamTitle}>Мой бренд</h1>
      <TeamPageContent user={user as UserPartial} />
    </div>
  )
}

export default TeamsPage;
