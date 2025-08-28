'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
// import { mutate } from 'swr'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import { useToast } from '@/hooks/useToast'
import { usePostCustomTimer } from '@/hooks/useTimerApi'
import SITE_MAP from '@/constants/siteMap.constant'

import CustomTimerForm, {
  CustomTimerFormHandle,
  CustomTimerFormValues,
} from '../_components/customTimerForm/customTimerForm'
import styles from './create.module.css'

export default function Create() {
  const { trigger: createCustomTimer } = usePostCustomTimer()
  const showToast = useToast()
    const router = useRouter()
  const formRef = useRef<CustomTimerFormHandle>(null)


  const triggerFormSubmit = () => {
    formRef.current?.submit()
  }

  const handleSubmit = async (values: CustomTimerFormValues) => {
    try {
      const res = await createCustomTimer({
        customTimerName: values.title,
        customTimerStepList: values.steps.map((step, index) => ({
          customTimerStepName: step.name,
          customTimerStepTime: step.time,
          customTimerStepOrder: index,
        })),
      })
      showToast('타이머가 생성되었습니다.', 'info')
      router.replace(`${SITE_MAP.TIMER_CUSTOM}?id=${res.data.customTimerId}`)
    } catch {
      return
    }
  }
  return (
    <div className={styles['page-container']}>
      <Header rightIcon={<CompleteButton />} onClick={triggerFormSubmit}>
        타이머 생성
      </Header>

      <CustomTimerForm
        ref={formRef}
        defaultValues={{
          title: '',
          steps: [],
        }}
        onSubmit={handleSubmit}
        onError={(message) => showToast(message, 'info')}
      />
    </div>
  )
}
