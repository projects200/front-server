'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/hooks/useToast'
import { useReadExercise } from '@/hooks/useExerciseApi'
import useApiErrorHandler from '@/hooks/useApiErrorHandler'

import ImageField from './imageField'
import InputField from '../../_components/inputField'
import TextareaField from '../../_components/textareaField'
import DateTimePicker from '../../_components/dateTimePicker'
import styles from './exerciseDetail.module.css'

type Props = {
  exerciseId: number
}

export default function ExerciseDetail({ exerciseId }: Props) {
  const showToast = useToast()
  const router = useRouter()
  const handleError = useApiErrorHandler()

  const { data, error, isLoading } = useReadExercise(exerciseId)

  useEffect(() => {
    if (isLoading) return

    if (error) {
      const navigated = handleError(error) // 401·기타 에러 공통 처리
      if (!navigated) router.back()
      return
    }

    if (!data) {
      showToast('데이터를 불러올 수 없습니다.', 'info')
      router.back()
    }
  }, [isLoading, error, data])

  if (isLoading || error || !data) return null
  return (
    <>
      {data.images?.length ? <ImageField images={data.images} /> : <></>}
      <InputField value={data.title} label="제목" id="title" readonly={true} />
      <DateTimePicker
        label="운동 시간"
        startedAt={data.startedAt}
        endedAt={data.endedAt}
        readonly={true}
      />
      {data.category && (
        <InputField
          value={data.category}
          label="운동 종류"
          id="category"
          readonly={true}
        />
      )}
      {data.location && (
        <InputField
          value={data.location}
          label="장소"
          id="location"
          readonly={true}
        />
      )}

      {data.content && (
        <TextareaField
          className={styles['text-field']}
          value={data.content}
          label="내용"
          id="content"
          readonly={true}
        />
      )}
    </>
  )
}
