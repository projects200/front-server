'use client'

import * as z from 'zod'

import { useState, useMemo } from 'react'
import { useForm } from '@tanstack/react-form'
import { ExerciseContent, ExercisePicture, ExerciseRecordReq } from '@/types/exercise'
import BottomButton from '@/components/commons/bottomButton'

import DateTimePicker from './dateTimePicker'
import InputField from './inputField'
import TextareaField from './textareaField'
import ImageUploader from './imageUploader'
import styles from './exerciseForm.module.css'

type Props = {
  defaultValues: ExerciseContent
  defaultPictures?: ExercisePicture[]
  onSubmit: (values: ExerciseRecordReq) => void
  onError: (message: string) => void
}

const exerciseSchema = (remain: number) =>
  z
    .object({
      title: z
        .string()
        .trim()
        .min(1, '운동 제목을 입력해주세요.')
        .max(255, '운동 제목은 최대 255자까지 입력 가능합니다.')
        .refine((val) => val.trim().length > 0, '공백만으로는 입력할 수 없습니다.'),
      category: z.string().trim().max(255, '운동 종류는 최대 255자까지 입력 가능합니다.').optional(),

      startedAt: z.string().refine((val) => new Date(val) < new Date(), '시작 일시는 현재 이전이어야 합니다.'),
      endedAt: z.string().refine((val) => new Date(val) < new Date(), '종료 일시는 현재 이전이어야 합니다.'),
      location: z.string().trim().max(255, '운동 장소는 최대 255자까지 입력 가능합니다.').optional(),
      content: z
        .string()
        .refine(
          (val) => new TextEncoder().encode(val).length <= 65535,
          '운동 상세 내용은 최대 65,535바이트까지 입력 가능합니다.',
        )
        .optional(),
      newImages: z.array(z.instanceof(File)).max(remain, '이미지는 최대 5장까지 업로드할 수 있습니다.'),
    })
    .refine((data) => new Date(data.startedAt) <= new Date(data.endedAt), {
      message: '종료 일시는 시작 일시 이후여야 합니다.',
      path: ['exerciseEndedAt'],
    })

const ExerciseForm = ({ defaultValues, defaultPictures = [], onSubmit, onError }: Props) => {
  const [existingPictures, setExistingPictures] = useState<ExercisePicture[]>(defaultPictures)
  const [deletedIds, setDeletedIds] = useState<number[]>([])
  const remain = useMemo(() => 5 - existingPictures.length, [existingPictures.length])
  
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      newImages: [] as File[],
    },
    validators: { onSubmit: exerciseSchema(remain) },
    canSubmitWhenInvalid: true,

    onSubmitInvalid: ({ formApi }) => {
      const fieldErrorMap = formApi.state.errorMap.onSubmit as Record<string, z.ZodIssue[]>
      const firstIssueArr = Object.values(fieldErrorMap)[0]
      const message = firstIssueArr?.[0]?.message ?? '입력값을 확인해주세요.'
      onError(message)
    },
    onSubmit: ({ value }) => {
      const payload: ExerciseRecordReq = { ...value, deletedIds }
      onSubmit(payload)
    },
  })

  return (
    <form
      className={styles['form']}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(e)
      }}
    >
      <form.Field name="title">
        {(field) => (
          <InputField
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            label="제목 *"
            id="title"
            maxLength={255}
            placeholder="제목을 입력해주세요."
          />
        )}
      </form.Field>

      <form.Field name="startedAt">
        {(startedAtField) => (
          <form.Field name="endedAt">
            {(endedAtField) => (
              <DateTimePicker
                label="운동 시간 *"
                startedAt={startedAtField.state.value}
                endedAt={endedAtField.state.value}
                onStartedAtChange={(value) => startedAtField.handleChange(value)}
                onEndedAtChange={(value) => endedAtField.handleChange(value)}
              />
            )}
          </form.Field>
        )}
      </form.Field>

      <form.Field name="category">
        {(field) => (
          <InputField
            value={field.state.value ?? ''}
            onChange={(e) => field.handleChange(e.target.value)}
            label="운동 종류"
            id="category"
            maxLength={255}
            placeholder="운동 종류를 입력해주세요."
          />
        )}
      </form.Field>

      <form.Field name="location">
        {(field) => (
          <InputField
            value={field.state.value ?? ''}
            onChange={(e) => field.handleChange(e.target.value)}
            label="장소"
            id="location"
            maxLength={255}
            placeholder="운동장소를 입력해주세요."
          />
        )}
      </form.Field>

      <form.Field name="content">
        {(field) => (
          <TextareaField
            value={field.state.value ?? ''}
            onChange={(e) => field.handleChange(e.target.value)}
            label="내용"
            id="content"
          />
        )}
      </form.Field>
      <form.Field name="newImages">
        {(field) => (
          <ImageUploader
            existing={existingPictures}
            files={field.state.value ?? []}
            setFiles={(files) => field.handleChange(files)}
            onDeleteExisting={(id) => {
              setExistingPictures((prev) => prev.filter((picture) => picture.pictureId !== id))
              setDeletedIds((prev) => [...prev, id])
            }}
          />
        )}
      </form.Field>
      <BottomButton className={styles['button']} type="submit">
        완료
      </BottomButton>
    </form>
  )
}

export default ExerciseForm
