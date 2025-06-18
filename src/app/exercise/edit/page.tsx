'use client'

import { useQueryState, parseAsInteger } from 'nuqs'
import { useEffect } from 'react'
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
import { ExerciseRecordReq } from '@/types/exercise'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseForm from '../_components/exerciseForm'

export default function Edit() {
  const router = useRouter()
  const showToast = useToast()
  const [exerciseId] = useQueryState('id', parseAsInteger)
  const { data, isLoading } = useReadExercise(exerciseId ?? 0)
  const { trigger: patchExercise, isMutating: isPatching } = usePatchExercise(exerciseId ?? 0)
  const { trigger: deletePictures, isMutating: isDeletingPics } = useDeleteExercisePictures(exerciseId ?? 0)
  const { trigger: uploadPictures, isMutating: isUploadingPics } = usePostExercisePictures()

  const loading = isLoading || isPatching || isDeletingPics || isUploadingPics

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
    } catch {
      return
    }
    let deleteFailed = false
    if (value.deletedIds?.length) {
      try {
        await deletePictures(value.deletedIds)
      } catch {
        deleteFailed = true
      }
    }

    if (!deleteFailed && value.images?.length) {
      try {
        await uploadPictures({ exerciseId: exerciseId ?? 0, images: value.images })
      } catch {}
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

  if (!exerciseId || !data) return null

  return (
    <>
      <Header>운동 기록 수정</Header>
      <ExerciseForm
        defaultValues={{
          title: data?.title,
          category: data?.category,
          startedAt: data?.startedAt,
          endedAt: data?.endedAt,
          location: data?.location,
          content: data?.content,
        }}
        defaultPictures={data?.images}
        onSubmit={handleSubmit}
        onError={(message) => showToast(message, 'info')}
      />

      {loading && <LoadingScreen />}
    </>
  )
}
