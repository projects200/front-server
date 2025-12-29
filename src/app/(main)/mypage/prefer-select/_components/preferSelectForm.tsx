'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as z from 'zod'
import { useForm, useStore } from '@tanstack/react-form'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import { useToast } from '@/hooks/useToast'
import type { ExerciseItem, PreferExercise } from '@/types/mypage'
import { usePostPreferredExerciseFormList } from '@/hooks/api/useMypageApi'

import SelectionStep from './selectionStep'
import DetailStep from './detailStep'
import styles from './preferSelectForm.module.css'

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

const createNewExercise = (item: ExerciseItem): PreferExercise => ({
  preferredExerciseId: -1,
  exerciseTypeId: item.exerciseTypeId,
  name: item.name,
  imageUrl: item.imageUrl,
  skillLevel: '',
  daysOfWeek: [false, false, false, false, false, false, false],
})

type Props = {
  exerciseItemList: ExerciseItem[]
  initialPreferredExercise: PreferExercise[]
}

export default function PreferSelectForm({
  exerciseItemList,
  initialPreferredExercise,
}: Props) {
  const router = useRouter()
  const showToast = useToast()
  const searchParams = useSearchParams()
  const nickName = searchParams.get('nickName') || '회원'
  const [step, setStep] = useState<'select' | 'detail'>('select')

  const { trigger: createExercise, isMutating: iscreateMutating } =
    usePostPreferredExerciseFormList()

  const form = useForm({
    defaultValues: { myExercises: initialPreferredExercise },
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
      const currentExercises = value.myExercises

      // 생성 : preferredExerciseId가 -1인 항목
      const newItems = currentExercises.filter(
        (curr) => curr.preferredExerciseId === -1,
      )

      let createPromise = null

      if (newItems.length > 0) {
        const createPayload = newItems.map((item) => ({
          exerciseTypeId: item.exerciseTypeId,
          skillLevel: item.skillLevel,
          daysOfWeek: item.daysOfWeek,
        }))

        createPromise = createExercise(createPayload)
      }
      // 수정 : ID가 있고(0이 아님), 내용이 변경된 항목
      // const updatePromises = currentExercises
      //   .filter((curr) => {
      //     if (curr.preferredExerciseId === -1) return false // 생성 대상임

      //     const original = initialPreferredExercise.find(
      //       (init) => init.preferredExerciseId === curr.preferredExerciseId,
      //     )

      //     if (!original) return false

      //     const isDaysChanged =
      //       JSON.stringify(curr.daysOfWeek) !==
      //       JSON.stringify(original.daysOfWeek)
      //     const isSkillChanged = curr.skillLevel !== original.skillLevel

      //     return isDaysChanged || isSkillChanged
      //   })
      //   .map((item) =>
      //     updateExercise({
      //       preferredExerciseId: item.preferredExerciseId,
      //       skillLevel: item.skillLevel,
      //       daysOfWeek: item.daysOfWeek,
      //     }),
      //   )

      // 삭제 : 초기 데이터에는 있으나 현재 데이터에 없는 항목
      // const deletePromises = initialPreferredExercise
      //   .filter(
      //     (init) =>
      //       !currentExercises.some(
      //         (curr) => curr.preferredExerciseId === init.preferredExerciseId,
      //       ),
      //   )
      //   .map((item) => deleteExercise(item.preferredExerciseId))

      try {
        await Promise.all([
          // ...deletePromises,
          ...(createPromise ? [createPromise] : []),
          // ...updatePromises,
        ])

        router.back()
      } catch {}
    },
  })

  const myExercises = useStore(
    form.baseStore,
    (state) => state.values.myExercises,
  )

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

      const prevData = initialPreferredExercise.find(
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

  if (iscreateMutating) return null

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
          allExercises={exerciseItemList}
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
