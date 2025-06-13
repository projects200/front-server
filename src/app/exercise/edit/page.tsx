'use client'

import { useQueryState, parseAsInteger } from 'nuqs'
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import LoadingScreen from '@/components/commons/loadingScreen'
import { useToast } from '@/hooks/useToast'
import {
  useReadExercise,
  usePatchExercise,
  useDeleteExercisePictures,
  usePostExercisePictures,
} from '@/hooks/useExerciseApi'
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler'
import { ExerciseRecordReq } from '@/types/exercise'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseForm from '../_components/exerciseForm'

export default function Edit() {
  const router = useRouter()
  const showToast = useToast()
  const handleError = useApiErrorHandler()
  const [exerciseId] = useQueryState('id', parseAsInteger)
  const { data, isLoading, error } = useReadExercise(exerciseId ?? 0)
  const { trigger: patchExercise, isMutating: isPatching } = usePatchExercise(exerciseId ?? 0)
  const { trigger: deletePictures, isMutating: isDeletingPics } = useDeleteExercisePictures(exerciseId ?? 0)
  const { trigger: uploadPictures, isMutating: isUploadingPics } = usePostExercisePictures()

  const loading = isLoading || isPatching || isDeletingPics || isUploadingPics

  const defaultValues = useMemo(() => {
    if (!data) return null
    const { title, category, location, startedAt, endedAt, content } = data
    return { title, category, location, startedAt, endedAt, content } as const
  }, [data])

  const defaultPictures = data?.images ?? []

  const handleSubmit = async (value: ExerciseRecordReq) => {
    try {
      await patchExercise({
        title: value.title,
        category: value.category,
        location: value.location,
        content: value.content,
        startedAt: value.startedAt,
        endedAt: value.endedAt,
      })
    } catch (error) {
      handleError(error)
      return
    }
    let deleteFailed = false
    if (value.deletedIds?.length) {
      try {
        await deletePictures(value.deletedIds)
      } catch (error) {
        deleteFailed = true
        handleError(error)
      }
    }

    if (!deleteFailed && value.newImages?.length) {
      try {
        await uploadPictures({ exerciseId: exerciseId ?? 0, newImages: value.newImages })
      } catch (error) {
        handleError(error, {
          messages: { 400: '이미지 업로드에 실패했습니다.' },
        })
      }
    }

    router.back()
    setTimeout(() => {
      router.replace(`${SITE_MAP.EXERCISE_DETAIL}?id=${exerciseId}`)
    }, 0)
  }

  useEffect(() => {
    if (!exerciseId) {
      showToast('해당 운동 기록이 없습니다.', 'info')
      router.back()
    }
  }, [])

  useEffect(() => {
    if (error) {
      showToast('운동 기록 조회에 실패했습니다.', 'info')
      router.back()
    }
  }, [error])

  if (!exerciseId || !defaultValues) return null

  return (
    <>
      <Header>운동 기록 수정</Header>
      <ExerciseForm
        defaultValues={defaultValues}
        defaultPictures={defaultPictures}
        onSubmit={handleSubmit}
        onError={(message) => showToast(message, 'info')}
      />
      {loading && <LoadingScreen />}
    </>
  )
}
