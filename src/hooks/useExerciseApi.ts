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
import SITE_MAP from '@/constants/siteMap.constant'

import useApiGet from './useApiGet'
import useApiMutation from './useApiMutation'

// 운동 기록 생성
export const usePostExercise = () =>
  useApiMutation<{ exerciseId: number }, ExerciseContent>(
    ['exercise/create'],
    createExercise,
    {
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
      policy: {
        messages: {
          400: '이미지 업로드에 실패했습니다.',
          403: '이미지 업로드에 실패했습니다.',
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
      shouldFetch,
      policy: {
        messages: { 400: '유효하지 않은 날짜입니다.' },
        actions: { 400: { type: 'redirect', to: SITE_MAP.EXERCISE } },
      },
    },
  )

// 운동기록 하루 조회
export const useReadExerciseList = (date: string, shouldFetch: boolean) =>
  useApiGet<ExerciseList[]>(
    ['exercise/list', date],
    (token) => readExerciseList(token, date).then(adaptExerciseList),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      shouldFetch,
      policy: {
        messages: { 400: '유효하지 않은 날짜입니다.' },
        actions: { 400: 'back' },
      },
    },
  )

// 운동 기록 내용 조회
export const useReadExercise = (exerciseId: number, shouldFetch: boolean) =>
  useApiGet<ExerciseRecordRes>(
    ['exercise/detail', exerciseId],
    (token) => readExercise(token, exerciseId).then(adaptExerciseRecord),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      shouldFetch,
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
    ['exercise/update', exerciseId],
    (token, body) => updateExercise(token, body, exerciseId),
    {
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
    ['exercise/delete', exerciseId],
    (token) => removeExercise(token, exerciseId),
    {
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
    ['exercise/delete/pictures', exerciseId],
    (token, pictureIds) =>
      removeExercisePictures(token, pictureIds, exerciseId),
    {
      policy: {
        messages: {
          400: '운동ID값이 올바르지 않습니다.',
          403: '접근할 수 없는 운동기록 입니다.',
          404: '운동기록이 존재하지 않습니다.',
        },
      },
    },
  )
