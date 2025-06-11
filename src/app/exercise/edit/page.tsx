'use client'

import { useQueryState, parseAsInteger } from 'nuqs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import { useToast } from '@/hooks/useToast'
import SITE_MAP from '@/constants/siteMap.constant'

import ExerciseEdit from './_components/exerciseEdit'

export default function Edit() {
  const [exerciseId] = useQueryState('id', parseAsInteger)
  const router = useRouter()
  const showToast = useToast()

  useEffect(() => {
    if (!exerciseId) {
      showToast('해당 운동 기록이 없습니다.', 'info')
      router.replace(SITE_MAP.EXERCISE_LIST)
    }
  }, [])

  if (!exerciseId) return null

  return (
    <>
      <Header>운동 기록 수정</Header>
      <ExerciseEdit exerciseId={exerciseId} />
    </>
  )
}
