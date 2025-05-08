import { adminBrandTeamsApi } from './adminBrandTeamsApi'
import { adminHackathonTeamsApi } from './adminHackathonTeamsApi'

export const adminTeamsApi = {
  ...adminBrandTeamsApi,
  ...adminHackathonTeamsApi,
}
