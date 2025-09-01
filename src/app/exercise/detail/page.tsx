'use client'
import { useQueryState, parseAsInteger } from 'nuqs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'
import { useToast } from '@/hooks/useToast'
import { isValidExerciseId } from '@/utils/validation'
import { useReadExercise } from '@/hooks/useExerciseApi'

import ImageField from './_components/imageField'
import InputField from '../_components/exerciseForm/inputField'
import TextareaField from '../_components/exerciseForm/textareaField'
import DateTimePicker from '../_components/exerciseForm/dateTimePicker'
import KebabModal from './_components/kebabModal'
import styles from './detail.module.css'

export default function Detail() {
  const router = useRouter()
  const showToast = useToast()
  const [exerciseId] = useQueryState('id', parseAsInteger)
  const invalidParam = !exerciseId || !isValidExerciseId(exerciseId)
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false)
  const { data, isLoading } = useReadExercise(exerciseId!, !invalidParam)

  useEffect(() => {
    if (invalidParam) {
      showToast('유효하지 않은 운동기록 ID입니다.', 'info')
      router.back()
    }
  }, [invalidParam])

  if (invalidParam || isLoading || !data) return null

  return (
    <>
      <Header
        rightIcon={<KebabIcon className={styles['header-icon']} />}
        onClick={() => setIsBottomModalOpen(true)}
      >
        기록 상세
      </Header>
      {data.images?.length ? <ImageField images={data.images} /> : <></>}

      <div className={styles['field-section']}>
        <InputField
          className={styles['data-field']}
          value={data.title}
          label="제목"
          id="title"
          readonly={true}
        />
        <div className={styles['data-field']}>
          <DateTimePicker
            label="운동 시간"
            startedAt={data.startedAt}
            endedAt={data.endedAt}
            readonly={true}
          />
        </div>

        {data.category && (
          <InputField
            className={styles['data-field']}
            value={data.category}
            label="운동 종류"
            id="category"
            readonly={true}
          />
        )}
        {data.location && (
          <InputField
            className={styles['data-field']}
            value={data.location}
            label="장소"
            id="location"
            readonly={true}
          />
        )}
      </div>

      {data.content && (
        <TextareaField
          className={styles['text-field']}
          value={data.content}
          label="내용"
          id="content"
          readonly={true}
        />
      )}
      <KebabModal
        isOpen={isBottomModalOpen}
        setIsOpen={setIsBottomModalOpen}
        exerciseId={exerciseId}
        startedAt={data.startedAt}
      />
    </>
  )
}
