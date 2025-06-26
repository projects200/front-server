import { mutate } from 'swr'

import {
  createExercise,
  createExercisePictures,
  readExerciseRange,
  readExerciseList,
  readExercise,
  updateExercise,
  removeExercise,
  removeExercisePictures,
} from '@/api/exercise'
import {
  adaptExerciseRange,
  adaptExerciseList,
  adaptExerciseRecord,
} from '@/lib/adapters/exercise.adapter'
import {
  ExerciseRange,
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
    {
      onSuccess: (data) => {
        mutate(
          ['exercise/range', data.variables.startedAt.substring(0, 7)],
          undefined,
          { revalidate: true },
        )
        mutate(
          ['exercise/list', data.variables.startedAt.substring(0, 10)],
          undefined,
          { revalidate: true },
        )
      },
      policy: { messages: { 400: '입력값이 올바르지 않습니다.' } },
    },
  )

// 운동 이미지 생성
export const usePostExercisePictures = () =>
  useApiMutation<
    { exerciseId: number },
    ExercisePicturesUpload & { exerciseId: number }
  >(
    ['exercise/create/pictures'],
    (token, { images, exerciseId }) =>
      createExercisePictures(token, { images }, exerciseId),
    {
      onSuccess: (data) => {
        mutate(['exercise/detail', data.data.exerciseId], undefined, {
          revalidate: true,
        })
      },
      policy: {
        messages: {
          400: '이미지 업로드에 실패했습니다.',
          403: '이미지 업로드에 실패했습니다.',
          500: '이미지 업로드에 실패했습니다.',
        },
      },
    },
  )

// 운동기록 기간 조회
export const useReadExerciseRange = (
  startDate: string,
  endDate: string,
  shouldFetch: boolean,
) =>
  useApiGet<ExerciseRange[]>(
    ['exercise/range', startDate.substring(0, 7)],
    (token) =>
      readExerciseRange(token, startDate, endDate).then(adaptExerciseRange),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      shouldFetch,
    },
  )

// 운동기록 하루 조회
export const useReadExerciseList = (date: string) =>
  useApiGet<ExerciseList[]>(
    ['exercise/list', date],
    (token) => readExerciseList(token, date).then(adaptExerciseList),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      policy: {
        messages: { 400: '올바르지 않은 날짜입니다.' },
        actions: { 400: 'back' },
      },
    },
  )

// 운동 기록 내용 조회
export const useReadExercise = (exerciseId: number) =>
  useApiGet<ExerciseRecordRes>(
    ['exercise/detail', exerciseId],
    (token) => readExercise(token, exerciseId).then(adaptExerciseRecord),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      policy: {
        messages: {
          403: '접근할 수 없는 운동기록 입니다.',
          404: '운동기록이 존재하지 않습니다.',
        },
        actions: { 403: 'back', 404: 'back' },
      },
    },
  )

// 운동 기록 수정
export const usePatchExercise = (exerciseId: number) =>
  useApiMutation<{ exerciseId: number }, ExerciseContent>(
    ['exercise/update'],
    (token, body) => updateExercise(token, body, exerciseId),
    {
      onSuccess: () => {
        mutate(['exercise/detail', exerciseId], undefined, {
          revalidate: true,
        })
      },
      policy: {
        messages: {
          400: '입력값이 올바르지 않습니다.',
          403: '접근할 수 없는 운동기록 입니다.',
          404: '운동기록이 존재하지 않습니다.',
        },
        actions: { 403: 'back', 404: 'back' },
      },
    },
  )

// 운동 기록 삭제
export const useDeleteExercise = (exerciseId: number) =>
  useApiMutation<null, null>(
    ['exercise/delete'],
    (token) => removeExercise(token, exerciseId),
    {
      onSuccess: () => {
        mutate(['exercise/detail', exerciseId], undefined, {
          revalidate: true,
        })
      },
      policy: {
        messages: {
          400: '운동ID값이 올바르지 않습니다.',
          403: '접근할 수 없는 운동기록 입니다.',
          404: '운동기록이 존재하지 않습니다.',
        },
        actions: { 403: 'back', 404: 'back' },
      },
    },
  )

// 운동 이미지 삭제
export const useDeleteExercisePictures = (exerciseId: number) =>
  useApiMutation<null, number[]>(
    ['exercise/delete/pictures'],
    (token, pictureIds) =>
      removeExercisePictures(token, pictureIds, exerciseId),
    {
      onSuccess: () => {
        mutate(['exercise/detail', exerciseId], undefined, {
          revalidate: true,
        })
      },
      policy: {
        messages: {
          400: '운동ID값이 올바르지 않습니다.',
          403: '접근할 수 없는 운동기록 입니다.',
          404: '운동기록이 존재하지 않습니다.',
        },
      },
    },
  )
