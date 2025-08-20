'use client'

import { useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import { mutate } from 'swr'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import { useToast } from '@/hooks/useToast'
// import { usePostCustomTimer } from '@/hooks/useTimerApi'
// import LoadingScreen from '@/components/commons/loadingScreen'

import CustomTimerForm, {
  CustomTimerFormHandle,
  CustomTimerFormValues,
} from '../_components/customTimerForm/customTimerForm'
import styles from './create.module.css'

export default function Create() {
  const showToast = useToast()
  const formRef = useRef<CustomTimerFormHandle>(null)
  // const { trigger: createCustomTimer, isMutating: creating } =
  //   usePostCustomTimer()

  const triggerFormSubmit = () => {
    formRef.current?.submit()
  }
  const handleSubmit = async (values: CustomTimerFormValues) => {
    console.log(values)
    // 백엔드 API 개발완료 후 연동
    // try {
    //   await createCustomTimer({
    //     customTimerName: values.title,
    //     customTimerStepList: values.steps.map((step, index) => ({
    //       customTimerStepsName: step.name,
    //       customTimerStepsTime: step.time,
    //       customTimerStepsOrder: index + 1,
    //     })),
    //   })
    // } catch {
    //   return
    // }
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
