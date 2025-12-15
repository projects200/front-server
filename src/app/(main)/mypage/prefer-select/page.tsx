'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Header from '@/components/commons/header'
import CompleteButton from '@/components/commons/completeButton'
import { useToast } from '@/hooks/useToast'
import { ExerciseItem, PreferExercises } from '@/types/mypage'

import SelectionStep from './_components/selectionStep'
import DetailStep from './_components/detailStep'
import styles from './preferSelect.module.css'

import { TEMP_DATA, TEMP_MY_DATA } from './tempData'

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
  const [initialData, setInitialData] = useState<PreferExercises[]>([])
  const [myExercises, setMyExercises] = useState<PreferExercises[]>([])

  // 초기 데이터 로드, 백엔드 API 개발 완료시 실제 데이터 호출
  useEffect(() => {
    setAllExercises(TEMP_DATA)
    setInitialData(TEMP_MY_DATA)
    setMyExercises(TEMP_MY_DATA)
  }, [])

  // 선호운동 아이템 토글 로직
  const handleToggleExercise = (id: number) => {
    const exists = myExercises.find((e) => e.exerciseTypeId === id)
    if (exists) {
      setMyExercises((prev) => prev.filter((e) => e.exerciseTypeId !== id))
    } else {
      if (myExercises.length >= 5) {
        showToast('최대 5개까지 선택 가능해요', 'info')
        return
      }

      const prevData = initialData.find((e) => e.exerciseTypeId === id)
      const baseInfo = allExercises.find((e) => e.exerciseTypeId === id)

      if (!baseInfo) return

      if (prevData) {
        setMyExercises((prev) => [...prev, prevData])
      } else {
        setMyExercises((prev) => [...prev, createNewExercise(baseInfo)])
      }
    }
  }

  // 요일 업데이트 로직
  const handleUpdateDay = (exerciseTypeId: number, daysOfWeek: boolean[]) => {
    setMyExercises((prev) =>
      prev.map((item) =>
        item.exerciseTypeId === exerciseTypeId
          ? { ...item, daysOfWeek: daysOfWeek }
          : item,
      ),
    )
  }

  // 숙련도 업데이트 로직
  const handleUpdateSkill = (exerciseTypeId: number, skillLevel: string) => {
    setMyExercises((prev) =>
      prev.map((item) =>
        item.exerciseTypeId === exerciseTypeId
          ? { ...item, skillLevel: skillLevel }
          : item,
      ),
    )
  }

  const handleNext = () => {
    if (myExercises.length === 0) {
      showToast('최소 1개 이상의 운동을 선택해주세요.', 'info')
      return
    }
    setStep('detail')
  }

  const handleComplete = () => {
    // 백엔드 API 연결 후 제출 로직 작성
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
          allExercises={allExercises}
          selectedExercises={myExercises.map((e) => e.exerciseTypeId)}
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
