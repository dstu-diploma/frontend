import { manageCriteriaApi } from './manageCriteriaApi'
import { manageHackathonsApi } from './manageHackathonsApi'
import { manageJuryApi } from './manageJuryApi'
import { manageTeamsApi } from './manageTeamsApi'

export const hackathonManageApi = {
  ...manageHackathonsApi,
  ...manageCriteriaApi,
  ...manageJuryApi,
  ...manageTeamsApi,
}
