import { cookies } from 'next/headers'
import TeamPageContent from '@/features/team/ui/TeamPageContent/TeamPageContent'
import { UserPartial } from '@/features/user/model/types'

export default async function TeamPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user')?.value
  const user = userCookie ? JSON.parse(userCookie) : null
  const hackathonId = await params.id

  return (
    <TeamPageContent
      user={user as UserPartial}
      path={`/hackathons/${hackathonId}/my`}
    />
  )
}
