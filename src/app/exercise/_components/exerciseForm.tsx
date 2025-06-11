'use client'

import * as z from 'zod'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import {
  ExerciseContent,
  ExercisePicture,
  ExerciseRecordReq,
} from '@/types/exercise'
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
  z.object({
    title: z.string().min(1, '필수 항목을 입력해주세요.'),
    category: z.string().optional(),
    startedAt: z.string().min(1, '필수 항목을 입력해주세요.'),
    endedAt: z.string().min(1, '필수 항목을 입력해주세요.'),
    location: z.string().optional(),
    content: z.string().optional(),
    newImages: z
      .array(z.instanceof(File))
      .max(remain, '이미지는 최대 5장까지 업로드할 수 있습니다.'),
  })

const ExerciseForm = ({
  defaultValues,
  defaultPictures = [],
  onSubmit,
  onError,
}: Props) => {
  const [existingPictures, setExistingPictures] =
    useState<ExercisePicture[]>(defaultPictures)
  const [deletedIds, setDeletedIds] = useState<number[]>([])

  const form = useForm({
    defaultValues: {
      ...defaultValues,
      newImages: [] as File[],
    },
    onSubmit: ({ value }) => {
      const remain = 5 - existingPictures.length
      const parsed = exerciseSchema(remain).safeParse(value)

      if (!parsed.success) {
        onError(parsed.error.errors[0]?.message ?? '입력값을 확인해주세요.')
        return
      }

      const payload: ExerciseRecordReq = {
        ...parsed.data,
        deletedIds,
      }

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
            maxLength={50}
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
                onStartedAtChange={(value) =>
                  startedAtField.handleChange(value)
                }
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
            maxLength={30}
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
            maxLength={50}
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
              setExistingPictures((prev) =>
                prev.filter((picture) => picture.pictureId !== id),
              )
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
