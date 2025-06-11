'use client'

import { useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/commons/header'
import BottomButton from '@/components/commons/bottomButton'
import { useToast } from '@/hooks/useToast'
import { isValidYYYYMMDD } from '@/utils/validation'
import SITE_MAP from '@/constants/siteMap.constant'

import DateLabel from './_components/dateLabel'
import ExerciseList from './_components/exerciseList'
import styles from './list.module.css'

export default function List() {
  const [date, setDate] = useQueryState('date')
  const router = useRouter()
  const showToast = useToast()

  useEffect(() => {
    if (!date || !isValidYYYYMMDD(date)) {
      showToast('해당 운동 기록이 없습니다.', 'info')
      router.replace(SITE_MAP.EXERCISE)
    }
  }, [])

  if (!date) return null

  return (
    <div className={styles['container']}>
      <Header>운동 기록</Header>
      <DateLabel value={date} onChange={setDate} />
      <ExerciseList date={date} />
      <BottomButton onClick={() => router.push(SITE_MAP.EXERCISE_CREATE)}>
        오늘 운동 기록하고 점수 얻기
      </BottomButton>
    </div>
  )
}
