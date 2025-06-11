'use client'

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
import useApiErrorHandler from '@/hooks/useApiErrorHandler'
import { ExerciseRecordReq } from '@/types/exercise'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseForm from '../../_components/exerciseForm'

type Props = {
  exerciseId: number
}

export default function ExerciseEditPage({ exerciseId }: Props) {
  const router = useRouter()
  const showToast = useToast()
  const handleError = useApiErrorHandler()

  const { data, isLoading, error } = useReadExercise(exerciseId)
  const { trigger: patchExercise, isMutating: isPatching } = usePatchExercise(exerciseId)
  const { trigger: deletePictures, isMutating: isDeletingPics } = useDeleteExercisePictures(exerciseId)
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
    } catch (err) {
      handleError(err)
      return
    }

    if (value.deletedIds?.length) {
      try {
        await deletePictures(value.deletedIds)
      } catch (err) {
        handleError(err)
        return
      }
    }

    if (value.newImages?.length) {
      try {
        await uploadPictures({ exerciseId: exerciseId, newImages: value.newImages })
      } catch (err) {
        handleError(err)
        return
      }
    }

    showToast('운동 기록이 수정되었습니다.', 'info')
    router.replace(`${SITE_MAP.EXERCISE_DETAIL}?id=${exerciseId}&date=${value.startedAt.split('T')[0]}`)
  }

  useEffect(() => {
    if (error) {
      showToast('운동 기록 조회에 실패했습니다.', 'info')
      router.back()
    }
  }, [error])

  if (!defaultValues) return null

  return (
    <>
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
