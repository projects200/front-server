import { ExercisePolicyDto } from '@/types/dto/policy.dto'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 운동점수 정책 조회
export function readExerciseScorePolicy(): Promise<ExercisePolicyDto> {
  return fetchWrapper<ExercisePolicyDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/open/v1/policy-groups/exercise-score/policies`,
    {
      method: 'GET',
    },
  )
}
