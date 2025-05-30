import { cookies } from 'next/headers'
import TeamPageContent from '@/features/team/ui/TeamPageContent/TeamPageContent'
import { UserPartial } from '@/features/user/model/types'

export default async function TeamPage() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user')?.value
  const user = userCookie ? JSON.parse(userCookie) : null

  return <TeamPageContent user={user as UserPartial} path={`/team`} />
}
