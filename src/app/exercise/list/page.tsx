'use client'

import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import BottomButton from '@/components/commons/bottomButton'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseList from './_components/exerciseList'

export default function List() {
  const router = useRouter()

  return (
    <>
      <Header>운동 기록</Header>
      <ExerciseList />
      <BottomButton onClick={() => router.push(SITE_MAP.EXERCISE_CREATE)}>
        오늘 운동 기록하고 점수 얻기
      </BottomButton>
    </>
  )
}
