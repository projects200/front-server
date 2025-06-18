'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import BottomButton from '@/components/commons/bottomButton'
import SITE_MAP from '@/constants/siteMap.constant'
import Logo from '@/assets/logo.svg'
import ServiceName from '@/assets/service_name.svg'
import Setting from '@/assets/icon_setting.svg'

import ExerciseCalendar from './_components/exerciseCalendar'
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
      <ExerciseCalendar />
      <BottomButton onClick={() => router.push(SITE_MAP.EXERCISE_CREATE)}>
        오늘 운동 기록하고 점수 얻기
      </BottomButton>
    </>
  )
}
