import { Judge, Criterion } from './types'

export function isJudge(item: Judge | Criterion): item is Judge {
  return 'user_uploads' in item && 'user_name' in item
}
