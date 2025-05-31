import { useCallback } from 'react'
import { useAuth } from 'react-oidc-context'

import { createExercise, createExercisePictures } from '@/api/exercise'
import { ExerciseRecord, ExercisePictures } from '@/types/exercise'
import { apiHandler } from '@/utils/apiHandler'

export function useExerciseApi() {
  const auth = useAuth()
  const user = auth.user
  const accessToken = user?.access_token

  // 운동 기록 생성
  const postExercise = useCallback(
    (data: ExerciseRecord) => {
      if (!accessToken) throw new Error('accessToken 만료')

      return apiHandler(async () => {
        const res = await createExercise(accessToken, data)
        if (!res.succeed) throw new Error(res.message)

        return res.data
      })
    },
    [accessToken],
  )

  // 운동 이미지 업로드
  const uploadExercisePictures = useCallback(
    (data: ExercisePictures, exerciseId: number) => {
      if (!accessToken) throw new Error('accessToken 만료')

      return apiHandler(async () => {
        const res = await createExercisePictures(accessToken, data, exerciseId)
        if (!res.succeed) throw new Error(res.message)

        return res.data
      })
    },
    [accessToken],
  )

  return { postExercise, uploadExercisePictures }
}
