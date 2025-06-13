'use client'

import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import { useToast } from '@/hooks/useToast'
import { usePostExercise, usePostExercisePictures } from '@/hooks/useExerciseApi'
import LoadingScreen from '@/components/commons/loadingScreen'
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler'
import { ExerciseRecordReq } from '@/types/exercise'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseForm from '../_components/exerciseForm'

export default function Create() {
  const showToast = useToast()
  const router = useRouter()
  const handleError = useApiErrorHandler()

  const { trigger: createExercise, isMutating: creating } = usePostExercise()
  const { trigger: uploadPictures, isMutating: uploading } = usePostExercisePictures()

  const handleSubmit = async (value: ExerciseRecordReq) => {
    let exerciseId: number | undefined

    try {
      const res = await createExercise({
        title: value.title,
        category: value.category,
        location: value.location,
        content: value.content,
        startedAt: value.startedAt,
        endedAt: value.endedAt,
      })
      exerciseId = res.exerciseId
    } catch (error) {
      handleError(error, {
        messages: { 400: '입력값이 올바르지 않습니다.' },
      })
      return
    }

    if (value.newImages?.length && exerciseId) {
      try {
        await uploadPictures({ exerciseId: exerciseId, newImages: value.newImages })
      } catch (error) {
        handleError(error, {
          messages: { 400: '이미지 업로드에 실패했습니다.' },
        })
      }
    }

    router.replace(`${SITE_MAP.EXERCISE_DETAIL}?id=${exerciseId}`)
  }

  return (
    <>
      <Header>운동 기록하기</Header>
      <ExerciseForm
        defaultValues={{
          title: '',
          category: '',
          startedAt: '',
          endedAt: '',
          location: '',
          content: '',
        }}
        onSubmit={handleSubmit}
        onError={(message) => showToast(message, 'info')}
      />
      {(creating || uploading) && <LoadingScreen />}
    </>
  )
}
