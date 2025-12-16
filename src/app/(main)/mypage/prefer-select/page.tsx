'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as z from 'zod'
import { useForm, useStore } from '@tanstack/react-form'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import { useToast } from '@/hooks/useToast'
import { ExerciseItem, PreferExercises } from '@/types/mypage'

import SelectionStep from './_components/selectionStep'
import DetailStep from './_components/detailStep'
import styles from './preferSelect.module.css'

import { TEMP_DATA, TEMP_MY_DATA } from './tempData'

const preferSelectSchema = z.object({
  myExercises: z
    .array(
      z.object({
        preferredExerciseId: z.number(),
        exerciseTypeId: z.number(),
        name: z.string(),
        imageUrl: z.string().nullable(),
        skillLevel: z.string().min(1, '모든 운동의 숙련도를 선택해주세요.'),
        daysOfWeek: z
          .array(z.boolean())
          .refine(
            (days) => days.some((day) => day),
            '모든 운동의 주기를 하나 이상 선택해주세요.',
          ),
      }),
    )
    .min(1, '최소 1개 이상의 운동을 선택해주세요.')
    .max(5, '최대 5개까지 선택 가능해요.'),
})

const createNewExercise = (item: ExerciseItem): PreferExercises => ({
  preferredExerciseId: 0,
  exerciseTypeId: item.exerciseTypeId,
  name: item.name,
  imageUrl: item.imageUrl,
  skillLevel: '',
  daysOfWeek: [false, false, false, false, false, false, false],
})

export default function PreferSelect() {
  const router = useRouter()
  const showToast = useToast()
  const searchParams = useSearchParams()
  const nickName = searchParams.get('nickName') || '회원'

  const [step, setStep] = useState<'select' | 'detail'>('select')
  const [allExercises, setAllExercises] = useState<ExerciseItem[]>([])

  const form = useForm({
    defaultValues: { myExercises: TEMP_MY_DATA },
    validators: { onSubmit: preferSelectSchema },
    canSubmitWhenInvalid: true,
    onSubmitInvalid: ({ formApi }) => {
      const fieldErrorMap = formApi.state.errorMap.onSubmit as Record<
        string,
        z.ZodIssue[]
      >
      const firstIssueArr = Object.values(fieldErrorMap)[0]
      showToast(firstIssueArr?.[0]?.message ?? '입력값을 확인해주세요.', 'info')
    },
    onSubmit: async ({ value }) => {
      // 백엔드로 데이터 전송 로직 개발 예정
      console.log('제출 값', value)
    },
  })

  const myExercises = useStore(
    form.baseStore,
    (state) => state.values.myExercises,
  )

  // 초기 데이터 로드, 백엔드 API 개발 완료시 실제 데이터 호출
  useEffect(() => {
    setAllExercises(TEMP_DATA)
  }, [])

  const handleToggleExercise = (exerciseItem: ExerciseItem) => {
    const existingIndex = myExercises.findIndex(
      (e) => e.exerciseTypeId === exerciseItem.exerciseTypeId,
    )

    if (existingIndex > -1) {
      form.removeFieldValue('myExercises', existingIndex)
    } else {
      if (myExercises.length >= 5) {
        showToast('최대 5개까지 선택 가능해요', 'info')
        return
      }

      const prevData = TEMP_MY_DATA.find(
        (e) => e.exerciseTypeId === exerciseItem.exerciseTypeId,
      )

      form.pushFieldValue(
        'myExercises',
        prevData || createNewExercise(exerciseItem),
      )
    }
  }

  const handleUpdateDay = (exerciseIndex: number, dayIndex: number) => {
    const newDays = [...myExercises[exerciseIndex].daysOfWeek]
    newDays[dayIndex] = !newDays[dayIndex]
    form.setFieldValue(`myExercises[${exerciseIndex}].daysOfWeek`, newDays)
  }

  const handleUpdateSkill = (exerciseIndex: number, skillLevel: string) => {
    form.setFieldValue(`myExercises[${exerciseIndex}].skillLevel`, skillLevel)
  }

  const handleNext = () => {
    if (myExercises.length === 0) {
      showToast('최소 1개 이상의 운동을 선택해주세요.', 'info')
      return
    }
    setStep('detail')
  }

  const handleComplete = () => {
    form.handleSubmit()
  }

  return (
    <div className={styles['container']}>
      <Header
        onBack={() => (step === 'select' ? router.back() : setStep('select'))}
        rightIcon={
          <CompleteButton>{step === 'select' ? '다음' : '완료'}</CompleteButton>
        }
        onClick={step === 'select' ? handleNext : handleComplete}
      >
        선호운동
      </Header>
      {step === 'select' ? (
        <SelectionStep
          nickName={nickName}
          allExercises={allExercises}
          selectedExercises={myExercises}
          onToggle={handleToggleExercise}
        />
      ) : (
        <DetailStep
          myExercises={myExercises}
          onUpdateDay={handleUpdateDay}
          onUpdateSkill={handleUpdateSkill}
        />
      )}
    </div>
  )
}
