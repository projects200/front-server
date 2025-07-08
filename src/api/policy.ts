import { ExercisePolicyDto } from '@/types/dto/policy'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 운동점수 정책 조회
export function readExerciseScorePolicy(token: string): Promise<ExercisePolicyDto> {
  return fetchWrapper<ExercisePolicyDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/미정`,
    {
      method: 'GET',
    },
    token,
  )
}