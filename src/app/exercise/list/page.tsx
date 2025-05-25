'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Header from '@/components/commons/header'
import ProtectedRoute from '@/components/commons/protectedRoute'
import BottomButton from '@/components/commons/bottomButton'
import SITE_MAP from '@/constants/siteMap.constant'

import DateLabel from './components/dateLabel'
import ExerciseCard from './components/exerciseCard'

export default function List() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [date, setDate] = useState<string | null>(searchParams.get('date'))

  useEffect(() => {
    // 파라미터date의 운동기록 가져오기
  }, [])

  return (
    <ProtectedRoute>
      <Header title="운동 기록" titleAlign="center" />
      <DateLabel value={date} onChange={setDate} />
      {/* 운동기록 개수만큼 */}
      {/* <ExerciseCard record={record}/> */}
      <BottomButton onClick={() => router.push(SITE_MAP.EXERCISE_CREATE)}>
        오늘 운동 기록하고 점수 얻기
      </BottomButton>
    </ProtectedRoute>
  )
}
