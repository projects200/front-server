import { readExerciseScorePolicy } from '@/api/policy'
import { adaptExercisePolicy } from '@/lib/adapters/policy.adapter'
import { ExercisePolicy } from '@/types/policy'

import usePublicApiGet from './usePublicApiGet'

// 운동점수 정책 조회
export const useReadExerciseScorePolicy = () =>
  usePublicApiGet<ExercisePolicy>(
    ['policy/exercise/score'],
    () => readExerciseScorePolicy().then(adaptExercisePolicy),
    {},
  )
