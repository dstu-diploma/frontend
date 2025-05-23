import { adminTeamsApi } from './teams'
import { adminUsersApi } from './users'

export const adminApi = {
  ...adminUsersApi,
  ...adminTeamsApi,
}
