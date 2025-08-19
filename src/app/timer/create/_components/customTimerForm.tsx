'use client'

import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useState } from 'react'
import * as z from 'zod'
import { useForm, useStore } from '@tanstack/react-form'

import PlusIcon from '@/assets/icon_plus.svg'
import MinusIcon from '@/assets/icon_minus.svg'
import ClockIcon from '@/assets/icon_clock.svg'
import { formatNumberToTime } from '@/utils/timer'

import TimePicker from '../../_components/timePicker'
import InputField from './inputField'
import styles from './customTimerForm.module.css'

export type CustomTimerFormHandle = {
  submit: () => void
}

export type CustomTimerFormValues = {
  title: string
  steps: {
    name: string
    time: number
  }[]
}

type Props = {
  defaultValues: CustomTimerFormValues
  onSubmit: (values: CustomTimerFormValues) => void
  onError: (message: string) => void
}

const customTimerSchema = () =>
  z.object({
    title: z
      .string()
      .trim()
      .min(1, '타이머 이름을 입력해주세요.')
      .max(50, '타이머 이름은 최대 255자까지 입력 가능합니다.')
      .refine(
        (val) => val.trim().length > 0,
        '공백만으로는 입력할 수 없습니다.',
      ),
    steps: z
      .array(
        z.object({
          name: z.string().max(20, '스탭 이름은 최대 255자까지 가능합니다.'),
          time: z
            .number()
            .min(1, '시간은 1초 이상이어야 합니다.')
            .max(3599, '시간은 60분 미만이어야 합니다.'),
        }),
      )
      .min(1, '최소 1개 이상의 스탭이 필요합니다.')
      .max(50, '스탭은 최대 50개까지 추가할 수 있습니다.'),
  })

const CustomTimerForm = forwardRef<CustomTimerFormHandle, Props>(
  ({ defaultValues, onSubmit, onError }, ref) => {
    const [editingTimeIndex, setEditingTimeIndex] = useState<number | null>(
      null,
    )
    const [newStepName, setNewStepName] = useState('')
    const [newStepTime, setNewStepTime] = useState(60)

    const form = useForm({
      defaultValues,
      validators: { onSubmit: customTimerSchema() },
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
        onSubmit(value)
      },
    })

    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(),
    }))

    const steps = useStore(form.store, (state) => state.values.steps)

    const handleAddTime = (name: string, time: number) => {
      const stepSchema = z.object({
        name: z.string(),
        time: z
          .number()
          .min(1, '시간은 1초 이상이어야 합니다.')
          .max(3599, '시간은 60분 미만이어야 합니다.'),
      })
      const validationResult = stepSchema.safeParse({ name, time })
      if (!validationResult.success) {
        onError(validationResult.error.issues[0].message)
        return
      }

      const currentSteps = form.state.values.steps
      const newStep = { name: name || 'Step', time }
      form.setFieldValue('steps', [...currentSteps, newStep])

      setNewStepName('')
      setNewStepTime(60)
    }

    const handlePickerComplete = (newTotalSeconds: number) => {
      if (editingTimeIndex === -1) {
        setNewStepTime(newTotalSeconds)
      } else if (editingTimeIndex !== null && editingTimeIndex >= 0) {
        const currentSteps = [...form.state.values.steps]
        currentSteps[editingTimeIndex] = {
          ...currentSteps[editingTimeIndex],
          time: newTotalSeconds,
        }
        form.setFieldValue('steps', currentSteps)
      }
      setEditingTimeIndex(null)
    }

    const getPickerPreset = () => {
      if (editingTimeIndex === null) return 0
      const time =
        editingTimeIndex === -1
          ? newStepTime
          : (steps[editingTimeIndex]?.time ?? 60)
      return time
    }

    return (
      <>
        <form
          className={styles['form-container']}
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(e)
          }}
        >
          <div className={styles['title-section']}>
            <form.Field name="title">
              {(field) => (
                <InputField
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  id="title"
                  maxLength={255}
                  placeholder="나만의 타이머 이름"
                />
              )}
            </form.Field>
          </div>

          <div className={styles['steps-section']}>
            <form.Field name="steps">
              {(field) => (
                <div className={styles['step-list']}>
                  {field.state.value.map((step, index) => (
                    <div key={index} className={styles['step-item']}>
                      <ClockIcon className={clsx(styles['clock-icon'])} />
                      <input
                        type="text"
                        value={step.name}
                        onChange={(e) => {
                          const newSteps = [...field.state.value]
                          newSteps[index] = { ...step, name: e.target.value }
                          field.handleChange(newSteps)
                        }}
                        placeholder="Step"
                        className={styles['step-name-input']}
                        maxLength={20}
                      />
                      <button
                        type="button"
                        className={styles['step-time-input']}
                        onClick={() => setEditingTimeIndex(index)}
                      >
                        {formatNumberToTime(step.time)}
                      </button>
                      <button
                        type="button"
                        onClick={() => field.removeValue(index)}
                        className={styles['step-button']}
                      >
                        <MinusIcon className={styles['icon-minus']}/>
                      </button>
                    </div>
                  ))}

                  {steps.length < 50 && (
                    <div className={styles['step-item']}>
                      <ClockIcon
                        className={clsx(
                          styles['clock-icon'],
                          styles['clock-icon-create'],
                        )}
                      />
                      <input
                        type="text"
                        value={newStepName}
                        onChange={(e) => setNewStepName(e.target.value)}
                        placeholder="Step"
                        className={styles['step-name-input']}
                        maxLength={20}
                      />
                      <button
                        type="button"
                        className={styles['step-time-input']}
                        onClick={() => setEditingTimeIndex(-1)}
                      >
                        {formatNumberToTime(newStepTime)}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddTime(newStepName, newStepTime)}
                        className={styles['step-button']}
                      >
                        <PlusIcon className={styles['icon-plus']}/>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </form>

        {editingTimeIndex !== null && (
          <TimePicker
            time={getPickerPreset()}
            onClose={() => setEditingTimeIndex(null)}
            onComplete={handlePickerComplete}
          />
        )}
      </>
    )
  },
)

CustomTimerForm.displayName = 'CustomTimerForm'
export default CustomTimerForm
