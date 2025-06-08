import { readExerciseList, readExercise } from '@/api/exercise'
import {
  adaptExerciseList,
  adaptExerciseRecord,
} from '@/lib/adapters/exercise.adapter'
import { ExerciseList, ExerciseRecordRes } from '@/types/exercise'
import { ApiError } from '@/types/common'

import useAuthFetch from '../useAuthFetch'

// 운동기록 하루 조회
export function useReadExerciseList(date: string) {
  return useAuthFetch<ExerciseList[]>(
    ['exerciseList', date],
    async (token) => {
      const res = await readExerciseList(token, date)
      if (!res.succeed) throw new ApiError(res.message, 400, res)
      return adaptExerciseList(res.data)
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  )
}

// 운동 기록 조회
export function useReadExercise(id: number) {
  return useAuthFetch<ExerciseRecordRes>(
    ['exerciseDetail', id],
    async (token) => {
      const res = await readExercise(token, id)
      if (!res.succeed) throw new ApiError(res.message, 400, res)
      return adaptExerciseRecord(res.data)
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )
}

// 추가예정
// 운동 기록 기간별 기록 조회
