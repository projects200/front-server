'use client'

import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import { useToast } from '@/hooks/useToast'
import {
  usePostExercise,
  usePostExercisePictures,
} from '@/hooks/useExerciseApi'
import { ExerciseRecordReq } from '@/types/exercise'
import LoadingScreen from '@/components/commons/loadingScreen'
import useApiErrorHandler from '@/hooks/useApiErrorHandler'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseForm from '../_components/exerciseForm'

export default function Create() {
  const showToast = useToast()
  const router = useRouter()
  const handleError = useApiErrorHandler()

  const {
    trigger: createExercise,
    isMutating: creating,
  } = usePostExercise()

  const {
    trigger: uploadPictures,
    isMutating: uploading,
  } = usePostExercisePictures()

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
    } catch (err) {
      handleError(err)
      return
    }

    if (value.images?.length && exerciseId) {
      try {
        await uploadPictures({ exerciseId: exerciseId, images: value.images })
      } catch {
        showToast('이미지 업로드에 실패했습니다.', 'info')
      }
    }

    router.replace(
      `${SITE_MAP.EXERCISE_DETAIL}?id=${exerciseId}&date=${value.startedAt.split('T')[0]}`,
    )
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
          images: [],
        }}
        onSubmit={handleSubmit}
        onError={(msg) => showToast(msg, 'info')}
      />
      {(creating || uploading) && <LoadingScreen />}
    </>
  )
}
