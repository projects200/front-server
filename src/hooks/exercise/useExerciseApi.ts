import { useCallback } from 'react'
import { useAuth } from 'react-oidc-context'

import {
  createExercise,
  createExercisePictures,
  removeExerciseDetail,
} from '@/api/exercise'
import { ExerciseContent, ExercisePicturesUpload } from '@/types/exercise'
import { ApiError } from '@/types/common'

export function useExerciseApi() {
  const { user } = useAuth()
  const accessToken = user?.access_token

  const assertToken = () => {
    if (!accessToken) {
      throw new ApiError('accessToken이 만료되었거나 존재하지 않습니다.', 401)
    }
  }

  // 운동 기록 생성
  const postExercise = useCallback(
    async (data: ExerciseContent) => {
      assertToken()
      const res = await createExercise(accessToken!, data)
      if (!res.succeed) {
        throw new ApiError(res.message, 400, res)
      }
      return res.data
    },
    [accessToken],
  )

  // 운동 이미지 업로드
  const uploadExercisePictures = useCallback(
    async (data: ExercisePicturesUpload, exerciseId: number) => {
      assertToken()
      const res = await createExercisePictures(accessToken!, data, exerciseId)
      if (!res.succeed) {
        throw new ApiError(res.message, 400, res)
      }
      return res.data
    },
    [accessToken],
  )

  // 운동기록 상세 삭제
  const deleteExerciseDetail = useCallback(
    async (exerciseId: number): Promise<null> => {
      assertToken()
      const res = await removeExerciseDetail(accessToken!, exerciseId)
      if (!res.succeed) {
        throw new ApiError(res.message, 400, res)
      }
      return res.data
    },
    [accessToken],
  )

  return {
    postExercise,
    uploadExercisePictures,
    deleteExerciseDetail,
  }
}
