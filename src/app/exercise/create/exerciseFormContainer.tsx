'use client'

import { useRouter } from 'next/navigation'

import { useToast } from '@/hooks/useToast'
import { useExerciseApi } from '@/hooks/useExerciseApi'
import { ExerciseRecordReq } from '@/types/exercise'
import { ApiError } from '@/types/common'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseForm from '../_components/exerciseForm'

export default function ExerciseFormContainer() {
  const showToast = useToast()
  const router = useRouter()
  const { postExercise, uploadExercisePictures } = useExerciseApi()

  const handleSubmit = async (values: ExerciseRecordReq) => {
    let resExerciseId = null
    // 운동기록 생성
    try {
      const data = await postExercise({
        title: values.title,
        category: values.category,
        location: values.location,
        content: values.content,
        startedAt: values.startedAt,
        endedAt: values.endedAt,
      })
      resExerciseId = data.exerciseId
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          showToast('인증이 만료되었습니다. 다시 로그인해주세요.', 'info')
          router.replace(SITE_MAP.LOGIN)
        } else {
          showToast(err.message, 'info')
          router.back()
        }
      } else if (err instanceof Error) {
        showToast(err.message, 'info')
        router.back()
      } else {
        showToast('서버 오류가 발생했습니다.', 'info')
        router.back()
      }
    }

    // 이미지 업로드
    if (resExerciseId && values.images && values.images.length > 0) {
      try {
        await uploadExercisePictures({ images: values.images }, resExerciseId)
      } catch (err: unknown) {
        // 업로드 실패 시 롤백 or 텍스트 기록만 생성 논의필요

        if (err instanceof ApiError) {
          if (err.status === 401) {
            showToast('인증이 만료되었습니다. 다시 로그인해주세요.', 'info')
            router.replace(SITE_MAP.LOGIN)
          } else {
            showToast(err.message, 'info')
          }
        } else if (err instanceof Error) {
          showToast(err.message, 'info')
        } else {
          showToast('서버 오류가 발생했습니다.', 'info')
        }
      }
    }

    router.replace(`${SITE_MAP.EXERCISE_DETAIL}?id=${resExerciseId}`)
  }

  return (
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
    />
  )
}
