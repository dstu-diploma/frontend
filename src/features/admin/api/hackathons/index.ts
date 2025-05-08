import { manageCriteriaApi } from './manageCriteriaApi'
import { manageHackathonsApi } from './manageHackathonsApi'
import { manageJuryApi } from './manageJuryApi'
import { manageTeamsApi } from './manageTeamsApi'

export const adminHackathonsApi = {
  ...manageHackathonsApi,
  ...manageCriteriaApi,
  ...manageJuryApi,
  ...manageTeamsApi,
}
