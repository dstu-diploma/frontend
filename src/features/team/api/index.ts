import { invitesApi } from './invitesApi'
import { teamBaseApi } from './teamBaseApi'
import { hackathonTeamsApi } from './hackathonTeamsApi'

export const teamApi = {
  ...teamBaseApi,
  ...invitesApi,
  ...hackathonTeamsApi,
}
