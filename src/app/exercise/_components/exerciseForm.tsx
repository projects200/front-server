'use client'

import * as z from 'zod'

import { useForm } from '@tanstack/react-form'
import { ExerciseRecordReq } from '@/types/exercise'
import BottomButton from '@/components/commons/bottomButton'

import DateTimePicker from './dateTimePicker'
import InputField from './inputField'
import TextareaField from './textareaField'
import ImageUploader from './imageUploader'
import styles from './exerciseForm.module.css'

type ExerciseFormProps = {
  defaultValues: ExerciseRecordReq
  onSubmit: (values: ExerciseRecordReq) => void
  onError: (message: string) => void
}

const exerciseSchema = z.object({
  title: z.string().min(1, '필수 항목을 입력해주세요.'),
  category: z.string().optional(),
  startedAt: z.string().min(1, '필수 항목을 입력해주세요.'),
  endedAt: z.string().min(1, '필수 항목을 입력해주세요.'),
  location: z.string().optional(),
  content: z.string().optional(),
  images: z
    .array(z.instanceof(File))
    .max(5, '이미지는 최대 5장까지 업로드할 수 있습니다.'),
})

const ExerciseForm = ({
  defaultValues,
  onSubmit,
  onError,
}: ExerciseFormProps) => {
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      const parsed = exerciseSchema.safeParse(value)
      if (parsed.success) onSubmit(parsed.data)
      else onError(parsed.error.errors[0]?.message ?? '입력값을 확인해주세요.')
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
      <form.Field name="images">
        {(field) => (
          <ImageUploader
            images={field.state.value ?? []}
            setImages={(files) => field.handleChange(files)}
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
