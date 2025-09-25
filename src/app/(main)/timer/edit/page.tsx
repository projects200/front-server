'use client'

import { useQueryState, parseAsInteger } from 'nuqs'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import { useToast } from '@/hooks/useToast'
import {
  useReadCustomTimerDetail,
  usePutCustomTimer,
  usePatchCustomTimer,
} from '@/hooks/api/useTimerApi'
import SITE_MAP from '@/constants/siteMap.constant'

import CustomTimerForm, {
  CustomTimerFormHandle,
  CustomTimerFormValues,
} from '../_components/customTimerForm/customTimerForm'
import styles from './edit.module.css'

function isStepsEqual(
  oldSteps: CustomTimerFormValues['steps'],
  newSteps: CustomTimerFormValues['steps'],
): boolean {
  if (oldSteps.length !== newSteps.length) {
    return false
  }
  return oldSteps.every(
    (oldStep, index) =>
      newSteps[index] &&
      oldStep.id === newSteps[index].id &&
      oldStep.name === newSteps[index].name &&
      oldStep.time === newSteps[index].time,
  )
}

export default function Edit() {
  const [customTimerId] = useQueryState('id', parseAsInteger)
  const { data } = useReadCustomTimerDetail(customTimerId!)
  const { trigger: putCustomTimer } = usePutCustomTimer(customTimerId!)
  const { trigger: patchCustomTimer } = usePatchCustomTimer(customTimerId!)
  const showToast = useToast()
  const router = useRouter()
  const formRef = useRef<CustomTimerFormHandle>(null)

  const initialValues: CustomTimerFormValues = {
    title: data?.customTimerName ?? '',
    steps:
      data?.customTimerStepList.map((step) => ({
        id: step.customTimerStepId,
        name: step.customTimerStepName,
        time: step.customTimerStepTime,
      })) ?? [],
  }

  const triggerFormSubmit = () => {
    formRef.current?.submit()
  }
  const handleSubmit = async (values: CustomTimerFormValues) => {
    const isNameChanged = values.title !== initialValues.title
    const areStepsChanged = !isStepsEqual(initialValues.steps, values.steps)

    try {
      if (areStepsChanged) {
        await putCustomTimer({
          customTimerName: values.title,
          customTimerStepList: values.steps.map((step, index) => ({
            customTimerStepName: step.name,
            customTimerStepTime: step.time,
            customTimerStepOrder: index,
          })),
        })
        showToast('타이머가 수정되었습니다.', 'info')
      } else if (isNameChanged) {
        await patchCustomTimer({ name: values.title })
        showToast('타이머가 수정되었습니다.', 'info')
      } else {
        showToast('변경된 내용이 없습니다.', 'info')
        return
      }

      router.back()
      setTimeout(() => {
        router.replace(`${SITE_MAP.TIMER_CUSTOM}?id=${customTimerId}`)
      }, 0)
    } catch {
      return
    }
  }
  return (
    <div className={styles['page-container']}>
      <Header
        rightIcon={<CompleteButton>완료</CompleteButton>}
        onClick={triggerFormSubmit}
      >
        타이머 수정
      </Header>

      <CustomTimerForm
        ref={formRef}
        defaultValues={initialValues}
        onSubmit={handleSubmit}
        onError={(message) => showToast(message, 'info')}
      />
    </div>
  )
}
