'use client'

import { useState, useRef } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

import ExerciseList from './_components/exerciseList/exerciseList'
import BottomButton from '@/components/commons/bottomButton'
import SITE_MAP from '@/constants/siteMap.constant'
import { useReadExerciseScore } from '@/hooks/api/useScoreApi'
import { ExerciseScore } from '@/types/score'
import BottomNavigation from '@/components/commons/bottomNavigation'
import LogoTitle from '@/components/ui/logoTitle'
import ExerciseCalendar from '@/components/commons/exerciseCalendar/exerciseCalendar'

import ScoreBoard from './_components/exercisePoint/scoreBoard'

import styles from './exercise.module.css'

export default function Exercise() {
  const { data: scoreData } = useReadExerciseScore(true)
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    format(new Date(), 'yyyy-MM-dd'),
  )
  const router = useRouter()
  const calendarRef = useRef<HTMLDivElement>(null)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(format(date, 'yyyy-MM-dd'))
    calendarRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const calculateBottomText = (
    scoreData: ExerciseScore | undefined,
    day: string,
  ): string => {
    if (!scoreData) {
      return '운동기록하기'
    }
    const isMaxScoreReached = scoreData.currentScore >= scoreData.maxScore
    const isBeforeValidPeriod =
      new Date(day) < new Date(scoreData.validPeriod.startedAt)
    const isDateAlreadyRecorded = !scoreData.ValidDate.includes(day)

    if (isMaxScoreReached || isBeforeValidPeriod || isDateAlreadyRecorded) {
      return '운동기록하기'
    }

    return `운동기록하고 ${scoreData.expectedScore}점 획득하기`
  }
  const bottomText = calculateBottomText(scoreData, selectedDate)
  return (
    <>
      <div className={styles['title-section']}>
        <LogoTitle />
      </div>

      <ScoreBoard />

      <div className={styles['calendar-section']}>
        <ExerciseCalendar
          ref={calendarRef}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
      </div>

      <ExerciseList selectedDate={selectedDate} />

      <BottomButton onClick={() => router.push(SITE_MAP.EXERCISE_CREATE)}>
        {bottomText}
      </BottomButton>

      <BottomNavigation />
    </>
  )
}
