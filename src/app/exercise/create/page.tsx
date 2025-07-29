'use client'

import { useRouter } from 'next/navigation'
import { mutate } from 'swr'
import { useState } from 'react'

import Header from '@/components/commons/header'
import { useToast } from '@/hooks/useToast'
import {
  usePostExercise,
  usePostExercisePictures,
} from '@/hooks/useExerciseApi'
import LoadingScreen from '@/components/commons/loadingScreen'
import { ExerciseRecordReq } from '@/types/exercise'
import Celebration from './_components/celebration'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseForm from '../_components/exerciseForm/exerciseForm'

export default function Create() {
  const [celebration, setCelebration] = useState(false)
  const [createdExerciseId, setCreatedExerciseId] = useState<number | null>(
    null,
  )
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null)
  const showToast = useToast()
  const router = useRouter()

  const { trigger: createExercise, isMutating: creating } = usePostExercise()
  const { trigger: uploadPictures, isMutating: uploading } =
    usePostExercisePictures()

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
      exerciseId = res.data.exerciseId

      setCreatedExerciseId(exerciseId)
      setEarnedPoints(res.data.earnedPoints)
    } catch {
      return
    }

    if (value.images?.length && exerciseId) {
      try {
        await uploadPictures({ exerciseId: exerciseId, images: value.images })
      } catch {}
    }

    await Promise.all([
      mutate(['exercise/range'], value.startedAt.substring(0, 7)),
      mutate(['exercise/list'], value.startedAt.substring(0, 10)),
    ])

    setCelebration(true)
  }

  const handleCelebrationConfirm = () => {
    if (createdExerciseId) {
      router.replace(`${SITE_MAP.EXERCISE_DETAIL}?id=${createdExerciseId}`)
    } else {
      router.replace(SITE_MAP.EXERCISE)
    }
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
        isCreate={true}
      />
      {(creating || uploading) && <LoadingScreen />}
      {celebration && earnedPoints !== null &&(
        <Celebration
          onConfirm={handleCelebrationConfirm}
          earnedPoints={earnedPoints}
        />
      )}
    </>
  )
}
