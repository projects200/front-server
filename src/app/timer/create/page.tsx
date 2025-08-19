'use client'

import { useRef } from 'react'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import { useToast } from '@/hooks/useToast'
import LoadingScreen from '@/components/commons/loadingScreen'

import CustomTimerForm, {
  CustomTimerFormHandle,
  CustomTimerFormValues,
} from './_components/customTimerForm'
import styles from './create.module.css'

export default function Create() {
  const showToast = useToast()
  const formRef = useRef<CustomTimerFormHandle>(null)

  const triggerFormSubmit = () => {
    formRef.current?.submit()
  }
  const handleSubmit = async (values: CustomTimerFormValues) => {
    // 임시
    console.log(values)
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
