'use client'

import * as z from 'zod'
import { format } from 'date-fns'
import { useForm, useStore } from '@tanstack/react-form'

import {
  ExerciseContent,
  ExercisePicture,
  ExerciseRecordReq,
} from '@/types/exercise'
import BottomButton from '@/components/commons/bottomButton'
import { useReadExerciseScore } from '@/hooks/useScoreApi'
import WarningIcon from '@/assets/icon_warning.svg'
import Typography from '@/components/ui/typography'

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
  isCreate?: boolean
}

const exerciseSchema = () =>
  z
    .object({
      title: z
        .string()
        .trim()
        .min(1, '운동 제목을 입력해주세요.')
        .max(255, '운동 제목은 최대 255자까지 입력 가능합니다.')
        .refine(
          (val) => val.trim().length > 0,
          '공백만으로는 입력할 수 없습니다.',
        ),
      category: z
        .string()
        .trim()
        .max(255, '운동 종류는 최대 255자까지 입력 가능합니다.')
        .optional(),

      startedAt: z
        .string()
        .refine(
          (val) => new Date(val) < new Date(),
          '시작 일시는 현재 이전이어야 합니다.',
        ),
      endedAt: z
        .string()
        .refine(
          (val) => new Date(val) < new Date(),
          '종료 일시는 현재 이전이어야 합니다.',
        ),
      location: z
        .string()
        .trim()
        .max(255, '운동 장소는 최대 255자까지 입력 가능합니다.')
        .optional(),
      content: z
        .string()
        .refine(
          (val) => new TextEncoder().encode(val).length <= 65535,
          '운동 상세 내용은 최대 65,535바이트까지 입력 가능합니다.',
        )
        .optional(),
      images: z
        .array(
          z.union([
            z
              .instanceof(File)
              .refine(
                (file) =>
                  file.size <= 10 * 1024 * 1024 &&
                  ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
                'jpg, jpeg, png 파일만 가능하며, 용량은 10MB 이하만 업로드할 수 있습니다.',
              ),
            z.string().url('유효하지 않은 이미지 URL입니다.'),
          ]),
        )
        .max(5, '이미지는 최대 5개까지 업로드할 수 있습니다.'),
    })
    .refine((data) => new Date(data.startedAt) <= new Date(data.endedAt), {
      message: '종료 일시는 시작 일시 이후여야 합니다.',
      path: ['exerciseEndedAt'],
    })

const ExerciseForm = ({
  defaultValues,
  defaultPictures = [],
  onSubmit,
  onError,
  isCreate = true,
}: Props) => {
  const { data: scoreData } = useReadExerciseScore(isCreate)
  const existingPictures = defaultPictures.map((picture) => picture.pictureUrl)

  const form = useForm({
    defaultValues: {
      ...defaultValues,
      images: existingPictures as (File | string)[],
    },
    validators: { onSubmit: exerciseSchema() },
    canSubmitWhenInvalid: true,

    onSubmitInvalid: ({ formApi }) => {
      const fieldErrorMap = formApi.state.errorMap.onSubmit as Record<
        string,
        z.ZodIssue[]
      >
      const firstIssueArr = Object.values(fieldErrorMap)[0]
      const message = firstIssueArr?.[0]?.message ?? '입력값을 확인해주세요.'
      onError(message)
    },
    onSubmit: ({ value }) => {
      const deletedIds = defaultPictures
        .filter((picture) => !value.images.includes(picture.pictureUrl))
        .map((picture) => picture.pictureId)

      const newFiles = value.images.filter((v): v is File => v instanceof File)

      const payload: ExerciseRecordReq = {
        ...value,
        deletedIds,
        images: newFiles,
      }

      onSubmit(payload)
    },
  })

  const startedDate = useStore(form.store, (state) => state.values.startedAt)

  const scoreDescription = ((): string => {
    if (!isCreate || !scoreData || !startedDate) {
      return ''
    }

    const selectedDate = new Date(startedDate)

    // 점수가 최대치인 경우
    if (scoreData.currentScore >= scoreData.maxScore) {
      return '점수가 최대치에 도달했어요!'
    }

    // 획득 가능 기간보다 이전 날짜를 선택한 경우
    const validWindowStart = new Date(scoreData.validPeriod.startedAt)
    if (selectedDate < validWindowStart) {
      return '점수를 획득할 수 있는 기간이 지났어요'
    }

    // 획득 가능 기간 내이지만, 이미 점수를 받은 날인 경우
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
    if (!scoreData.ValidDate.includes(selectedDateStr)) {
      return '이 날은 이미 점수를 획득했어요'
    }

    return ''
  })()

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
            className={styles['form-field']}
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
              <div className={styles['form-field']}>
                <DateTimePicker
                  label="운동 시간 *"
                  startedAt={startedAtField.state.value}
                  endedAt={endedAtField.state.value}
                  onStartedAtChange={(value) =>
                    startedAtField.handleChange(value)
                  }
                  onEndedAtChange={(value) => endedAtField.handleChange(value)}
                />
                {scoreDescription && (
                  <div className={styles['score-description']}>
                    <WarningIcon className={styles['warning-icon']} />
                    <Typography
                      as="span"
                      variant="text12"
                      className={styles['description']}
                    >
                      {scoreDescription}
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </form.Field>
        )}
      </form.Field>

      <form.Field name="category">
        {(field) => (
          <InputField
            className={styles['form-field']}
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
            className={styles['form-field']}
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
            className={styles['form-field']}
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
            files={field.state.value ?? []}
            setFiles={(files) => field.handleChange(files)}
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
