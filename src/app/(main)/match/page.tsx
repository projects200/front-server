'use client'

import BottomNavigation from '@/components/commons/bottomNavigation'
import SITE_MAP from '@/constants/siteMap.constant'
import Typography from '@/components/ui/typography'
import RightArrow from '@/assets/icon_right_arrow.svg'

import KakaoMap from './_components/kakaoMap'
import styles from './match.module.css'
import Link from 'next/link'

export default function Match() {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Link
          href={SITE_MAP.MATCH_PLACE_LIST}
          className={styles['places-button']}
        >
          <Typography as="span" variant="text15" weight="bold">
            운동장소 목록
          </Typography>
          <RightArrow />
        </Link>
      </div>
      <KakaoMap />
      <BottomNavigation />
    </div>
  )
}
