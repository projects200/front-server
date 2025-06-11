'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/hooks/useToast'
import { useExerciseApi } from '@/hooks/exercise/useExerciseApi'
import { ExerciseRecordReq } from '@/types/exercise'
import { ApiError } from '@/types/common'
import LoadingScreen from '@/components/commons/loadingScreen'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseForm from '../_components/exerciseForm'

export default function ExerciseFormContainer() {
  const showToast = useToast()
  const router = useRouter()
  const { postExercise, postExercisePictures } = useExerciseApi()

  const [isLoading, setIsLoading] = useState(false) // 추후 SWR적용시 삭제예정

  const handleSubmit = async (values: ExerciseRecordReq) => {
    setIsLoading(true)
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
        await postExercisePictures({ images: values.images }, resExerciseId)
      } catch (err: unknown) {
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
    <>
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
      {isLoading && <LoadingScreen />}
    </>
  )
}
