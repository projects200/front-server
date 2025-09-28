import {
  createExerciseLocation,
  readExerciseLocationList,
  removeExerciseLocation,
} from '@/api/exerciseLocation'
import { adapterExerciseLocationList } from '@/lib/adapters/exerciseLocation.adapter'
import { ExerciseLocationId, ExerciseLocation } from '@/types/exerciseLocation'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 회원 운동 장소 등록
export const usePostExerciseLocation = () =>
  useApiMutation<ExerciseLocationId, ExerciseLocation>(
    ['exerciseLocation'],
    (token, body) => createExerciseLocation(token, body),
    {},
  )

// 회원 운동 장소 목록 조회
export const useReadExerciseLocationList = () =>
  useApiGet<(ExerciseLocationId & ExerciseLocation)[]>(
    ['exerciseLocation'],
    (token) =>
      readExerciseLocationList(token).then(adapterExerciseLocationList),
    {},
  )

// 회원 운동 장소 수정(예정)

// 회원 운동 장소 삭제
export const useDeleteExerciseLocation = () =>
  useApiMutation<null, ExerciseLocationId>(
    ['exerciseLocation'],
    (token, body) => removeExerciseLocation(token, body.id),
  )