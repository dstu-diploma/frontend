import { hackathonBaseApi } from './hackathonBaseApi'
import { hackathonsManageApi } from './manage'

export const hackathonApi = {
  ...hackathonBaseApi,
  ...hackathonsManageApi,
}
