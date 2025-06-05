import { readExerciseList, readExerciseDetail } from '@/api/exercise'
import { adaptExerciseRecord } from '@/lib/adapters/exercise.adapter'
import { ExerciseRecordRes } from '@/types/exercise'
import { ApiError } from '@/types/common'

import useAuthFetch from '../useAuthFetch'

// 운동기록 하루 조회 임시코드
export function useExerciseList(date: string) {
  return useAuthFetch<unknown>(
    ['exerciseList', date],
    async (token) => {
      const res = await readExerciseList(token, date)
      if (!res.succeed) throw new ApiError(res.message, 400, res)
      return res.data
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )
}

// 운동 기록 상세 조회
export function useExerciseDetail(id: number) {
  return useAuthFetch<ExerciseRecordRes>(
    ['exerciseDetail', id],
    async (token) => {
      const res = await readExerciseDetail(token, id)
      if (!res.succeed) throw new ApiError(res.message, 400, res)
      return adaptExerciseRecord(res.data)
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )
}

// 추가예정
// 운동 기록 기간별 기록 조회
