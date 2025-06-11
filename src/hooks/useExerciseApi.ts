// import { mutate } from 'swr'

import {
  createExercise,
  createExercisePictures,
  readExerciseList,
  readExercise,
  updateExercise,
  removeExercise,
  removeExercisePictures,
} from '@/api/exercise'
import {
  adaptExerciseList,
  adaptExerciseRecord,
} from '@/lib/adapters/exercise.adapter'
import {
  ExerciseList,
  ExerciseRecordRes,
  ExerciseContent,
  ExercisePicturesUpload,
} from '@/types/exercise'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 운동 기록 생성
export const usePostExercise = () =>
  useApiMutation<{ exerciseId: number }, ExerciseContent>(
    ['exercise/create'],
    createExercise,
    // {
    //   onSuccess: () => mutate((key: string) => key.startsWith('exercise/list')),
    // },
  )

// 운동 이미지 생성
export const usePostExercisePictures = () =>
  useApiMutation<
    { exerciseId: number },
    ExercisePicturesUpload & { exerciseId: number }
  >(['exercise/create/pictures'], (token, { newImages, exerciseId }) =>
    createExercisePictures(token, { newImages }, exerciseId),
  )

// 운동기록 하루 조회
export const useReadExerciseList = (date: string) =>
  useApiGet<ExerciseList[]>(
    ['exercise/list', date],
    (token) => readExerciseList(token, date).then(adaptExerciseList),
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )

// 운동 기록 내용 조회
export const useReadExercise = (exerciseId: number) =>
  useApiGet<ExerciseRecordRes>(
    ['exercise/detail', exerciseId],
    (token) => readExercise(token, exerciseId).then(adaptExerciseRecord),
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )

// 운동 기록 수정
export const usePatchExercise = (exerciseId: number) =>
  // 응답형태 변경점 없을시 어떤형식인지 확인필요
  useApiMutation<null, ExerciseContent>(
    ['exercise/update', exerciseId],
    (token, body) => updateExercise(token, body, exerciseId),
    {
      // onSuccess: () => mutate(['exercise/detail', exerciseId]),
    },
  )

// 운동 기록 삭제
export const useDeleteExercise = (exerciseId: number) =>
  useApiMutation<null, null>(
    ['exercise/delete', exerciseId],
    (token) => removeExercise(token, exerciseId),
    // {
    //   onSuccess: () => mutate(['exercise/list', date]),
    // },
  )

// 운동 이미지 삭제
export const useDeleteExercisePictures = (exerciseId: number) =>
  useApiMutation<null, number[]>(
    ['exercise/delete/pictures', exerciseId],
    (token, pictureIds) =>
      removeExercisePictures(token, pictureIds, exerciseId),
    // {
    //   onSuccess: () => mutate(['exercise/list', date]),
    // },
  )
