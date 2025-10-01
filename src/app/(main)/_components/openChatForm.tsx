'use client'

import { forwardRef, useImperativeHandle } from 'react'
import * as z from 'zod'
import { useForm } from '@tanstack/react-form'

import Typography from '@/components/ui/typography'

import styles from './openChatForm.module.css'

export type OpenChatUrlFormHandle = { submit: () => void }

export type OpenChatUrl = {
  openChatUrl: string
}

type Props = {
  defaultValues: OpenChatUrl
  onSubmit: (values: OpenChatUrl) => void
  onError: (message: string) => void
}

const openChatUrlSchema = z.object({
  openChatUrl: z
    .string()
    .min(1, '카카오톡 오픈채팅 URL을 입력해 주세요.')
    .regex(
      /^https:\/\/open\.kakao\.com\/o\/[A-Za-z0-9]+$/,
      '올바른 카카오톡 오픈채팅 URL 형식이 아닙니다.',
    ),
})

const OpenChatForm = forwardRef<OpenChatUrlFormHandle, Props>(
  ({ defaultValues, onSubmit, onError }, ref) => {
    const form = useForm({
      defaultValues,
      validators: { onSubmit: openChatUrlSchema },
      canSubmitWhenInvalid: true,
      onSubmitInvalid: ({ formApi }) => {
        const fieldErrorMap = formApi.state.errorMap.onSubmit as Record<
          string,
          z.ZodIssue[]
        >
        const firstIssueArr = Object.values(fieldErrorMap)[0]
        onError(firstIssueArr?.[0]?.message ?? '입력값을 확인해주세요.')
      },
      onSubmit: ({ value }) => onSubmit(value),
    })

    useImperativeHandle(ref, () => ({ submit: () => form.handleSubmit() }))

    return (
      <form
        className={styles['form']}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(e)
        }}
      >
        <Typography as="h1" variant="content-large" weight="bold">
          카카오 오픈 채팅 URL
        </Typography>
        <form.Field name="openChatUrl">
          {(field) => (
            <input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                }
              }}
              className={styles['url-input']}
              id={'openChatUrl'}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              maxLength={50}
              placeholder="예시) https://open.kakao.com/o/undabang"
            />
          )}
        </form.Field>
      </form>
    )
  },
)
OpenChatForm.displayName = 'OpenChatForm'
export default OpenChatForm
