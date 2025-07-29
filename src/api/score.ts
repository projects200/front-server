import { ExerciseScoreDto } from '@/types/dto/score'
import { fetchWrapper } from '@/utils/fetchWrapper'

// 예상 획득 점수 정보 조회
export function readExerciseScore(token: string): Promise<ExerciseScoreDto> {
  return fetchWrapper<ExerciseScoreDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/scores/expected-points-info`,
    {
      method: 'GET',
    },
    token,
  )
}