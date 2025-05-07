import { hackathonBaseApi } from './hackathonBaseApi'
import { hackathonManageApi } from './manage'

export const hackathonApi = {
  ...hackathonBaseApi,
  ...hackathonManageApi,
}
