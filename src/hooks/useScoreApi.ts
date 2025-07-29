import { readExerciseScore } from '@/api/score'
import { adapterExerciseScore } from '@/lib/adapters/score.adapter'
import { ExerciseScore } from '@/types/score'

import useApiGet from './useApiGet'

// 예상 획득 점수 정보 조회
export const useReadExerciseScore = () =>
  useApiGet<ExerciseScore>(
    ['score/exercise'],
    (token) => readExerciseScore(token).then(adapterExerciseScore),
    {},
  )
