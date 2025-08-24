'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'
import * as z from 'zod'

import { useForm, useStore } from '@tanstack/react-form'

import TimePicker from '../timePicker'
import StepItem from './stepItem'
import StepCreator from './stepCreator'
import styles from './customTimerForm.module.css'

export type CustomTimerFormHandle = { submit: () => void }

export type CustomTimerFormValues = {
  title: string
  steps: { name: string; time: number }[]
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
      .max(100, '타이머 이름은 최대 100자까지 입력 가능합니다.')
      .refine(
        (val) => val.trim().length > 0,
        '공백만으로는 입력할 수 없습니다.',
      ),
    steps: z
      .array(
        z.object({
          name: z
            .string()
            .max(50, '스탭 이름은 최대 50자까지 가능합니다.')
            .refine(
              (val) => val.trim().length > 0 || val.length === 0,
              '스탭 이름은 공백만으로 입력할 수 없습니다.',
            ),
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
        onError(firstIssueArr?.[0]?.message ?? '입력값을 확인해주세요.')
      },
      onSubmit: ({ value }) => {
        const hasEmptyStepName = value.steps.some(
          (step) => step.name.trim().length === 0,
        )

        if (hasEmptyStepName) {
          onError('모든 스탭의 이름을 입력해주세요.')
        }

        onSubmit(value)
      },
    })

    useImperativeHandle(ref, () => ({ submit: () => form.handleSubmit() }))

    const steps = useStore(form.store, (state) => state.values.steps)

    // StepCreator에서 새로운 스탭을 추가할 때 호출되는 콜백 함수
    const handleAddStep = (name: string, time: number) => {
      const currentSteps = form.state.values.steps
      const newStep = { name: name || 'Step', time }
      form.setFieldValue('steps', [...currentSteps, newStep])
      setNewStepTime(60)
    }

    // TimePicker에서 시간 선택 완료 시 호출되는 콜백 함수
    const handlePickerComplete = (newTotalSeconds: number) => {
      if (editingTimeIndex === -1) {
        setNewStepTime(newTotalSeconds)
      } else if (editingTimeIndex !== null) {
        const currentSteps = [...form.state.values.steps]
        currentSteps[editingTimeIndex].time = newTotalSeconds
        form.setFieldValue('steps', currentSteps)
      }
      setEditingTimeIndex(null)
    }

    // TimePicker에 전달할 초기 시간을 계산하는 함수
    const getPickerInitialTime = () => {
      if (editingTimeIndex === null) return 0
      return editingTimeIndex === -1
        ? newStepTime
        : (steps[editingTimeIndex]?.time ?? 60)
    }

    return (
      <>
        <form
          className={styles['form']}
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(e)
          }}
        >
          <div className={styles['title-section']}>
            <form.Field name="title">
              {(field) => (
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                    }
                  }}
                  className={styles['title-input']}
                  id={'title'}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  maxLength={100}
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
                    <StepItem
                      key={index}
                      step={step}
                      onNameChange={(newName) => {
                        const newSteps = [...field.state.value]
                        newSteps[index].name = newName
                        field.handleChange(newSteps)
                      }}
                      onTimeClick={() => setEditingTimeIndex(index)}
                      onRemove={() => field.removeValue(index)}
                    />
                  ))}
                  {steps.length < 50 && (
                    <StepCreator
                      onAdd={handleAddStep}
                      onTimeClick={() => setEditingTimeIndex(-1)}
                      newStepTime={newStepTime}
                    />
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </form>

        {editingTimeIndex !== null && (
          <TimePicker
            time={getPickerInitialTime()}
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
