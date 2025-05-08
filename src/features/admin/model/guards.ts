import { User } from '@/features/user'
import { TeamInfo } from '@/features/team/model/types'

export const isUser = (entity: User | TeamInfo | undefined): entity is User => {
  if (!entity) return false
  return 'first_name' in entity && 'last_name' in entity && 'email' in entity
}

export const isTeam = (
  entity: User | TeamInfo | undefined,
): entity is TeamInfo => {
  if (!entity) return false
  return 'id' in entity && 'name' in entity && 'mates' in entity
}
