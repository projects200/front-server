import { readExerciseScorePolicy } from '@/api/policy'
import { adaptExercisePolicy } from '@/lib/adapters/policy.adapter'
import { ExercisePolicy } from '@/types/policy'

import useApiGet from './useApiGet'

// 운동점수 정책 조회
export const useReadExerciseScorePolicy = () =>
  useApiGet<ExercisePolicy>(
    ['policy/exercise/score'],
    (token) => readExerciseScorePolicy(token).then(adaptExercisePolicy),
    {},
  )
