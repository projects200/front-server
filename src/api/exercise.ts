import { ExerciseContent, ExercisePicturesUpload } from '@/types/exercise'
import {
  ExerciseListResDto,
  ExerciseRangeResDto,
  ExerciseContentReqDto,
  ExerciseRecordResDto,
} from '@/types/dto/exercise'
import { fetchWrapper } from '@/utils/fetchWrapper'
import { adaptExerciseContent } from '@/lib/adapters/exercise.adapter'

// 운동 기록 생성
export function createExercise(token: string, data: ExerciseContent): Promise<{ exerciseId: number }> {
  const dto: ExerciseContentReqDto = adaptExerciseContent(data)
  return fetchWrapper<{ exerciseId: number }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises`,
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
    token,
  )
}

// 운동 이미지 생성
export function createExercisePictures(
  token: string,
  data: ExercisePicturesUpload,
  exerciseId: number,
): Promise<{ exerciseId: number }> {
  const formData = new FormData()

  data.images.forEach((file) => {
    formData.append('pictures', file)
  })

  return fetchWrapper<{ exerciseId: number }>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/${exerciseId}/pictures`,
    {
      method: 'POST',
      body: formData,
    },
    token,
  )
}

// 운동 기록 기간 조회
export function readExerciseRange(token: string, startDate: string, endDate: string): Promise<ExerciseRangeResDto[]> {
  return fetchWrapper<ExerciseRangeResDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/count?start=${startDate}&end=${endDate}`,
    {
      method: 'GET',
    },
    token,
  )
}

// 운동 기록 하루 조회
export function readExerciseList(token: string, date: string): Promise<ExerciseListResDto[]> {
  return fetchWrapper<ExerciseListResDto[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises?date=${date}`,
    {
      method: 'GET',
    },
    token,
  )
}

// 운동 기록 내용 조회
export function readExercise(token: string, exerciseId: number): Promise<ExerciseRecordResDto> {
  return fetchWrapper<ExerciseRecordResDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/${exerciseId}`,
    {
      method: 'GET',
    },
    token,
  )
}

// 운동 기록 수정
export function updateExercise(
  token: string,
  data: ExerciseContent,
  exerciseId: number,
  // 응답형태 변경점 없을시 어떤형식인지 확인필요
): Promise<null> {
  const dto: ExerciseContentReqDto = adaptExerciseContent(data)
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/${exerciseId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(dto),
    },
    token,
  )
}

// 운동 기록 삭제
export function removeExercise(token: string, exerciseId: number): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/${exerciseId}`,
    {
      method: 'DELETE',
    },
    token,
  )
}

// 운동 이미지 삭제
export function removeExercisePictures(token: string, images: number[], exerciseId: number): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercises/${exerciseId}/pictures?pictureIds=${images.join(',')}`,
    {
      method: 'DELETE',
    },
    token,
  )
}
