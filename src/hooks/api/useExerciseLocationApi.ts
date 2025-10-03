import {
  createExerciseLocation,
  readExerciseLocationList,
  updateExerciseLocation,
  removeExerciseLocation,
} from '@/api/exerciseLocation'
import { adapterExerciseLocationList } from '@/lib/adapters/exerciseLocation.adapter'
import {
  ExerciseLocationId,
  ExerciseLocation,
  ExerciseLocationName,
} from '@/types/exerciseLocation'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 회원 운동 장소 등록
export const usePostExerciseLocation = () =>
  useApiMutation<ExerciseLocationId, ExerciseLocation>(
    ['exerciseLocation'],
    (token, body) => createExerciseLocation(token, body),
    {
      policy: {
        messages: {
          409: '이미 사용중인 운동 장소명 입니다.',
        },
        actions: { 409: null },
      },
    },
  )

// 회원 운동 장소 목록 조회
export const useReadExerciseLocationList = () =>
  useApiGet<(ExerciseLocationId & ExerciseLocation)[]>(
    ['exerciseLocation'],
    (token) =>
      readExerciseLocationList(token).then(adapterExerciseLocationList),
    {},
  )

// 회원 운동 장소 수정
export const usePatchExerciseLocation = () =>
  useApiMutation<ExerciseLocationId, ExerciseLocationName & ExerciseLocationId>(
    ['exerciseLocation'],
    (token, body) => updateExerciseLocation(token, body),
    {
      policy: {
        messages: {
          409: '이미 사용중인 운동 장소명 입니다.',
        },
        actions: { 409: null },
      },
    },
  )

// 회원 운동 장소 삭제
export const useDeleteExerciseLocation = () =>
  useApiMutation<null, ExerciseLocationId>(
    ['exerciseLocation'],
    (token, body) => removeExerciseLocation(token, body.id),
  )
