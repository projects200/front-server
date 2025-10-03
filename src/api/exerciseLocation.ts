import {
  ExerciseLocation,
  ExerciseLocationId,
  ExerciseLocationName,
} from '@/types/exerciseLocation'
import {
  ExerciseLocationIdDto,
  ExerciseLocationDto,
  ExerciseLocationNameDto,
} from '@/types/dto/exerciseLocation.dto'
import { fetchWrapper } from '@/utils/fetchWrapper'
import {
  adapterExerciseLocationFormToDto,
  adapterExerciseLocationNameToDto,
} from '@/lib/adapters/exerciseLocation.adapter'

// 회원 운동 장소 등록
export function createExerciseLocation(
  token: string,
  data: ExerciseLocation,
): Promise<ExerciseLocationIdDto> {
  const dto: ExerciseLocationDto = adapterExerciseLocationFormToDto(data)
  return fetchWrapper<ExerciseLocationIdDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercise-locations`,
    {
      method: 'POST',
      body: JSON.stringify(dto),
    },
    token,
  )
}

// 회원 운동 장소 목록 조회
export function readExerciseLocationList(
  token: string,
): Promise<(ExerciseLocationIdDto & ExerciseLocationDto)[]> {
  return fetchWrapper<(ExerciseLocationIdDto & ExerciseLocationDto)[]>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercise-locations`,
    {
      method: 'GET',
    },
    token,
  )
}

// 회원 운동 장소 수정
export function updateExerciseLocation(
  token: string,
  data: ExerciseLocationName & ExerciseLocationId,
): Promise<ExerciseLocationIdDto> {
  const dto: ExerciseLocationNameDto = adapterExerciseLocationNameToDto(data)
  return fetchWrapper<ExerciseLocationIdDto>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercise-locations/${data.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(dto),
    },
    token,
  )
}

// 회원 운동 장소 삭제
export function removeExerciseLocation(
  token: string,
  locationId: number,
): Promise<null> {
  return fetchWrapper<null>(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/exercise-locations/${locationId}`,
    {
      method: 'DELETE',
    },
    token,
  )
}
