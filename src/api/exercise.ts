import { ApiResponse } from '@/types/common'
import { ExerciseRecord, ExercisePictures } from '@/types/exercise'
import { authFetch } from '@/utils/authFetch'

// 운동 기록 생성
export function createExercise(
  token: string,
  data: ExerciseRecord,
): Promise<ApiResponse<{ exerciseId: number }>> {
  return authFetch<ApiResponse<{ exerciseId: number }>>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises`,
    {
      method: 'POST',
      body: JSON.stringify({
        exerciseTitle: data.title,
        exercisePersonalType: data.category,
        exerciseLocation: data.location,
        exerciseDetail: data.content,
        exerciseStartedAt: data.startedAt,
        exerciseEndedAt: data.endedAt,
      }),
    },
    token,
  )
}

// 운동 이미지 업로드
export function createExercisePictures(
  token: string,
  data: ExercisePictures,
  exerciseId: number,
): Promise<ApiResponse<{ exerciseId: number }>> {
  const formData = new FormData()

  data.images.forEach((file) => {
    formData.append('pictures', file)
  })

  return authFetch<ApiResponse<{ exerciseId: number }>>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/${exerciseId}/pictures`,
    {
      method: 'POST',
      body: formData,
    },
    token,
  )
}
