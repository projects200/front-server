import { useCallback } from 'react'
import { useAuth } from 'react-oidc-context'

import { createExercise, createExercisePictures } from '@/api/exercise'
import { ExerciseRecord, ExercisePictures } from '@/types/exercise'
import { ApiError } from '@/types/common'

export function useExerciseApi() {
  const auth = useAuth()
  const user = auth.user
  const accessToken = user?.access_token

  // 운동 기록 생성
  const postExercise = useCallback(
    async (data: ExerciseRecord) => {
      if (!accessToken) {
        throw new ApiError('accessToken이 만료되었거나 존재하지 않습니다.', 401)
      }
      const res = await createExercise(accessToken, data)
      if (!res.succeed) {
        throw new ApiError(res.message, 400, res)
      }
      return res.data
    },
    [accessToken],
  )

  // 운동 이미지 업로드
  const uploadExercisePictures = useCallback(
    async (data: ExercisePictures, exerciseId: number) => {
      if (!accessToken) {
        throw new ApiError('accessToken이 만료되었거나 존재하지 않습니다.', 401)
      }
      const res = await createExercisePictures(accessToken, data, exerciseId)
      if (!res.succeed) {
        throw new ApiError(res.message, 400, res)
      }
      return res.data
    },
    [accessToken],
  )

  return { postExercise, uploadExercisePictures }
}
