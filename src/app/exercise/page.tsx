'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ExerciseList from './_components/exerciseList/exerciseList'
import BottomButton from '@/components/commons/bottomButton'
import SITE_MAP from '@/constants/siteMap.constant'
import Logo from '@/assets/logo.svg'
import ServiceName from '@/assets/service_name.svg'
import Setting from '@/assets/icon_setting.svg'
import ScoreBoard from './_components/exercisePoint/scoreBoard'
import ExerciseCalendar from './_components/exerciseCalendar/exerciseCalendar'
import styles from './exercise.module.css'

export default function Exercise() {
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    format(new Date(), 'yyyy-MM-dd'),
  )
  const router = useRouter()

  const handleDateSelect = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    setSelectedDate(dateStr)
  }

  return (
    <>
      <header className={styles['header']}>
        <div className={styles['brand']}>
          <Logo className={styles['logo']} />
          <ServiceName className={styles['service-name']} />
        </div>
        <Link href={SITE_MAP.SETTINGS} className={styles['setting-button']}>
          <Setting className={styles['setting-icon']} />
        </Link>
      </header>

      <ScoreBoard />
      <div className={styles['divider']}></div>

      <ExerciseCalendar
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />
      <ExerciseList selectedDate={selectedDate} />

      <BottomButton onClick={() => router.push(SITE_MAP.EXERCISE_CREATE)}>
        오늘 운동 기록하고 점수 얻기
      </BottomButton>
    </>
  )
}
