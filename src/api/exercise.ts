import { ApiResponse } from '@/types/common'
import { ExerciseContent, ExercisePicturesUpload } from '@/types/exercise'
import {
  ExerciseContentReqDto,
  ExerciseRecordResDto,
} from '@/types/dto/exercise'
import { authFetch } from '@/utils/authFetch'
import { adaptExerciseContent } from '@/lib/adapters/exercise.adapter'

// 운동 기록 생성
export function createExercise(
  token: string,
  data: ExerciseContent,
): Promise<ApiResponse<{ exerciseId: number }>> {
  const dto: ExerciseContentReqDto = adaptExerciseContent(data)
  return authFetch<ApiResponse<{ exerciseId: number }>>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises`,
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
    token,
  )
}

// 운동 이미지 업로드
export function createExercisePictures(
  token: string,
  data: ExercisePicturesUpload,
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

// 운동기록 상세 조회
export function readExerciseDetail(
  token: string,
  exerciseId: number,
): Promise<ApiResponse<ExerciseRecordResDto>> {
  return authFetch<ApiResponse<ExerciseRecordResDto>>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/${exerciseId}`,
    {
      method: 'GET',
    },
    token,
  )
}

// 운동기록 상세 삭제
export function removeExerciseDetail(
  token: string,
  exerciseId: number,
): Promise<ApiResponse<null>> {
  return authFetch<ApiResponse<null>>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/${exerciseId}`,
    {
      method: 'DELETE',
    },
    token,
  )
}
