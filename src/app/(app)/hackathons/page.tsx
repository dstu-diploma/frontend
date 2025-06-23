import { cookies } from 'next/headers'
import HackathonPageContent from '@/features/hackathons/ui/hackathonsListPage/HackathonPage/HackathonPage'

export default async function HackathonsPage() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user')?.value
  const user = userCookie ? JSON.parse(userCookie) : null
  const canManageHackathons =
    user && (user.role === 'admin' || user.role === 'organizer')

  return <HackathonPageContent canManageHackathons={canManageHackathons} />
}
