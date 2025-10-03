'use client'

import { useQueryState, parseAsInteger } from 'nuqs'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'

import Header from '@/components/commons/header'
import LoadingScreen from '@/components/commons/loadingScreen'
import { useToast } from '@/hooks/useToast'
import {
  useReadExercise,
  usePatchExercise,
  useDeleteExercisePictures,
  usePostExercisePictures,
} from '@/hooks/api/useExerciseApi'
import { ExerciseRecordReq } from '@/types/exercise'
import { isValidExerciseId } from '@/utils/validation'
import SITE_MAP from '@/constants/siteMap.constant'
import CompleteButton from '@/components/commons/completeButton'

import ExerciseForm, {
  ExerciseFormHandle,
} from '../_components/exerciseForm/exerciseForm'

export default function Edit() {
  const formRef = useRef<ExerciseFormHandle>(null)
  const router = useRouter()
  const showToast = useToast()
  const [exerciseId] = useQueryState('id', parseAsInteger)
  const invalidParam = !exerciseId || !isValidExerciseId(exerciseId)
  const { data, isLoading } = useReadExercise(exerciseId!, !invalidParam)
  const { trigger: patchExercise, isMutating: isPatching } = usePatchExercise(
    exerciseId!,
  )
  const { trigger: deletePictures, isMutating: isDeletingPics } =
    useDeleteExercisePictures(exerciseId!)
  const { trigger: uploadPictures, isMutating: isUploadingPics } =
    usePostExercisePictures()
  const loading = isLoading || isPatching || isDeletingPics || isUploadingPics

  useEffect(() => {
    if (invalidParam) {
      showToast('유효하지 않은 운동기록 ID입니다.', 'info')
      router.back()
    }
  }, [invalidParam])

  const triggerFormSubmit = () => {
    formRef.current?.submit()
  }

  const handleSubmit = async (value: ExerciseRecordReq) => {
    if (!data) return
    const formValuesChanged =
      data.title !== value.title ||
      data.category !== value.category ||
      data.location !== value.location ||
      data.content !== value.content ||
      data.startedAt !== value.startedAt ||
      data.endedAt !== value.endedAt

    const imagesChanged =
      (value.deletedIds && value.deletedIds.length > 0) ||
      (value.images && value.images.length > 0)

    if (!formValuesChanged && !imagesChanged) {
      showToast('변경사항이 없습니다.', 'info')
      return
    }
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
        await uploadPictures({
          exerciseId: exerciseId ?? 0,
          images: value.images,
        })
      } catch {}
    }

    await Promise.all([
      mutate(['exercise/detail', exerciseId]),
      mutate(['exercise/list', value.startedAt.substring(0, 10)]),
      ...(data.startedAt !== value.startedAt
        ? [mutate(['exercise/list', data.startedAt.substring(0, 10)])]
        : []),
    ])

    router.back()
    setTimeout(() => {
      router.replace(`${SITE_MAP.EXERCISE_DETAIL}?id=${exerciseId}`)
    }, 0)
  }

  if (invalidParam || !exerciseId || !data) return null

  return (
    <>
      <Header
        rightIcon={<CompleteButton>완료</CompleteButton>}
        onClick={triggerFormSubmit}
      >
        운동 기록 수정
      </Header>
      <ExerciseForm
        ref={formRef}
        defaultValues={{
          title: data.title,
          category: data.category,
          startedAt: data.startedAt,
          endedAt: data.endedAt,
          location: data.location,
          content: data.content,
        }}
        defaultPictures={data.images}
        onSubmit={handleSubmit}
        onError={(message) => showToast(message, 'info')}
        isCreate={false}
      />

      {loading && <LoadingScreen />}
    </>
  )
}
