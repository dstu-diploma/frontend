import { manageCriteriaApi } from './manageCriteriaApi'
import { manageHackathonAttachmentsApi } from './manageHackathonAttachments'
import { manageHackathonsApi } from './manageHackathonsApi'
import { manageJuryApi } from './manageJuryApi'
import { manageTeamsApi } from './manageTeamsApi'

export const hackathonsManageApi = {
  ...manageHackathonsApi,
  ...manageCriteriaApi,
  ...manageJuryApi,
  ...manageTeamsApi,
  ...manageHackathonAttachmentsApi,
}
