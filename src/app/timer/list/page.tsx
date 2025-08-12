'use client'

import Link from 'next/link'

import BottomNavigation from '@/components/commons/bottomNavigation'
import LogoTitle from '@/components/ui/logoTitle'
import RightArrow from '@/assets/icon_right_arrow.svg'
import PlusIcon from '@/assets/icon_plus.svg'
import Typography from '@/components/ui/typography'
import SITE_MAP from '@/constants/siteMap.constant'

import styles from './list.module.css'

export default function List() {
  // 추후 커스텀 타이머 리스트를 훅으로 불러오기

  return (
    <>
      <LogoTitle />
      <Link
        className={styles['simple-timer-container']}
        href={SITE_MAP.TIMER_SIMPLE}
      >
        <Typography
          className={styles['simple-timer-text']}
          as="span"
          variant="text22"
          weight="medium"
        >
          심플 타이머
        </Typography>
        <RightArrow className={styles['right-arrow-icon']} />
      </Link>

      {/* 커스텀 타이머 리스트 개수만큼 map함수로 컴포넌트 생성 */}

      <Link
        className={styles['custom-timer-container']}
        href={SITE_MAP.TIMER_CREATE}
      >
        <Typography as="span" variant="text22" weight="medium">
          나만의 타이머
        </Typography>
        <PlusIcon className={styles['plus-icon']} />
      </Link>

      <BottomNavigation />
    </>
  )
}
