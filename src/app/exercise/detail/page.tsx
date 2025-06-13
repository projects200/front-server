'use client'
import { useQueryState, parseAsInteger } from 'nuqs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import KebabIcon from '@/assets/icon_kebab.svg'
import { useReadExercise } from '@/hooks/useExerciseApi'
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler'
import SITE_MAP from '@/constants/siteMap.constant'

import ImageField from './_components/imageField'
import InputField from '../_components/inputField'
import TextareaField from '../_components/textareaField'
import DateTimePicker from '../_components/dateTimePicker'
import KebabModal from './_components/kebabModal'
import styles from './detail.module.css'

export default function Detail() {
  const router = useRouter()
  const handleError = useApiErrorHandler()
  const [exerciseId] = useQueryState('id', parseAsInteger)
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false)
  const { data, error, isLoading } = useReadExercise(exerciseId ?? 0)

  useEffect(() => {
    if (!exerciseId) {
      router.replace(SITE_MAP.EXERCISE)
    }
  }, [exerciseId])

  useEffect(() => {
    if (error) {
      handleError(error, {
        messages: { 403: '운동 기록에 접근 권한이 없습니다.', 404: '운동기록이 존재하지 않습니다.' },
        actions: { 403: 'back', 404: 'back' },
      })
    }
  }, [error])

  if (!exerciseId || isLoading || error || !data) return null

  return (
    <>
      <Header rightIcon={<KebabIcon className={styles['header-icon']} />} onClick={() => setIsBottomModalOpen(true)}>
        기록 상세
      </Header>
      {data.images?.length ? <ImageField images={data.images} /> : <></>}
      <InputField value={data.title} label="제목" id="title" readonly={true} />
      <DateTimePicker label="운동 시간" startedAt={data.startedAt} endedAt={data.endedAt} readonly={true} />
      {data.category && <InputField value={data.category} label="운동 종류" id="category" readonly={true} />}
      {data.location && <InputField value={data.location} label="장소" id="location" readonly={true} />}

      {data.content && (
        <TextareaField
          className={styles['text-field']}
          value={data.content}
          label="내용"
          id="content"
          readonly={true}
        />
      )}
      <KebabModal isOpen={isBottomModalOpen} setIsOpen={setIsBottomModalOpen} exerciseId={exerciseId} />
    </>
  )
}
