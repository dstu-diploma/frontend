import { UserPartial } from '@/features/user/model/types'
import { TeamMateRef } from '../model/types'

export type ModalWarningObject = {
  type: 'allowed' | 'restricted'
  message: string
}

export const confirmModalWarning = (
  teamMates: TeamMateRef[] | null | undefined,
  user: UserPartial,
): ModalWarningObject => {
  if (!teamMates) {
    return {
      type: 'allowed',
      message: '',
    }
  }
  if (
    teamMates?.length != 1 &&
    teamMates?.filter(mate => mate.is_captain).length == 1 &&
    teamMates?.find(mate => mate.is_captain && mate.user_id === user.id)
  ) {
    return {
      type: 'restricted',
      message: 'Назначьте нового капитана, т.к. вы единственный капитан',
    }
  }

  if (teamMates?.length === 1) {
    return {
      type: 'allowed',
      message:
        'Вы - последний участник, при выходе данные о команде будут удалены',
    }
  }

  return {
    type: 'allowed',
    message: '',
  }
}
