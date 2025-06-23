import { Judge, Criterion } from './types'

export function isJudge(item: Judge | Criterion): item is Judge {
  return 'user_name' in item
}
