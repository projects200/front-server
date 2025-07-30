'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import BottomButton from '@/components/commons/bottomButton'
import SITE_MAP from '@/constants/siteMap.constant'
import Logo from '@/assets/logo.svg'
import ServiceName from '@/assets/service_name.svg'
import Setting from '@/assets/icon_setting.svg'
import ScoreBoard from './_components/exercisePoint/scoreBoard'
import ExerciseCalendar from './_components/exerciseCalendar/exerciseCalendar'
import styles from './exercise.module.css'

export default function Exercise() {
  const router = useRouter()

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

      <div className={styles['temp-section']}></div>

      <ExerciseCalendar />
      {/* 화면작은 핸드폰에서 바텀버튼이 달력을 가려 임시공간 사용
      추후 운동기록 목록이 달력 밑으로 옮겨질시 제거 */}
      <div className={styles['temp-section-bottom']}></div>

      <BottomButton onClick={() => router.push(SITE_MAP.EXERCISE_CREATE)}>
        오늘 운동 기록하고 점수 얻기
      </BottomButton>
    </>
  )
}
