'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import { useToast } from '@/hooks/useToast'

import SelectionStep from './_components/selectionStep'
import DetailStep from './_components/detailStep'
import styles from './preferSelect.module.css'

import { TEMP_DATA } from './tempData'

export default function PreferSelect() {
  const router = useRouter()
  const showToast = useToast()
  const searchParams = useSearchParams()
  const nickName = searchParams.get('nickName') || '회원'

  const [step, setStep] = useState<'select' | 'detail'>('select')
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleToggleExercise = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id))
    } else {
      if (selectedIds.length < 5) {
        setSelectedIds((prev) => [...prev, id])
      } else {
        showToast('최대 5개까지 선택 가능해요', 'info')
      }
    }
  }

  const handleNext = () => {
    if (selectedIds.length === 0) {
      showToast('최소 1개 이상의 운동을 선택해주세요.', 'info')
      return
    }
    setStep('detail')
  }

  const handleComplete = () => {
    alert('완료')
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
          allExercises={TEMP_DATA}
          selectedExercises={selectedIds}
          onToggle={handleToggleExercise}
        />
      ) : (
        <DetailStep nickName={nickName} />
      )}
    </div>
  )
}
