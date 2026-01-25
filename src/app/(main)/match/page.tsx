'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import MascotCharacter from '@/assets/mascot_character.svg'
import BottomNavigation from '@/components/commons/bottomNavigation'
import SITE_MAP from '@/constants/siteMap.constant'
import Typography from '@/components/ui/typography'
import RightArrow from '@/assets/icon_right_arrow.svg'

import FilterBar from './_components/filterBar'
import type { FilterItems } from './_components/filterBar'
import KakaoMap from './_components/kakaoMap'
import styles from './match.module.css'

const INITIAL_FILTERS: FilterItems = {
  gender: null,
  age: null,
  sport: null,
  skill: null,
  workoutDays: [],
  score: null,
}

const MATCH_GUIDE_KEY = 'has_seen_match_guide'

export default function Match() {
  const router = useRouter()

  const [filters, setFilters] = useState<FilterItems>(INITIAL_FILTERS)
  const [showGuide, setShowGuide] = useState<boolean | null>(null)

  const handleFilterChange = <K extends keyof FilterItems>(key: K, value: FilterItems[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS)
  }

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem(MATCH_GUIDE_KEY)
    if (hasSeenGuide) {
      setShowGuide(false)
    } else {
      setShowGuide(true)
    }
  }, [])

  if (showGuide === null) return null

  return (
    <div className={styles['container']}>
      {showGuide ? (
        <div className={styles['guide-container']}>
          <header className={styles['guide-header']}>
            <Typography className={styles['guide-header-text']} as="h1" variant="content-large" weight="bold">
              운동 메이트 찾기
            </Typography>
            <button
              className={styles['guide-header-subtext']}
              onClick={() => {
                localStorage.setItem(MATCH_GUIDE_KEY, 'true')
                setShowGuide(false)
              }}
            >
              <Typography as="div" variant="content-large" weight="medium">
                건너뛰기
              </Typography>
            </button>
          </header>
          <div className={styles['guide-content']}>
            <MascotCharacter className={styles['guide-mascot']} />
            <Typography className={styles['guide-title']} as="h2" variant="title-medium" weight="bold">
              운동 메이트를 찾아보세요!
            </Typography>
            <Typography className={styles['guide-sub-text1']} as="p" variant="content-large" weight="medium">
              혼자 운동하기 지루하셨나요?
            </Typography>
            <Typography className={styles['guide-sub-text2']} as="p" variant="content-large" weight="medium">
              근처에서 함께 운동할 메이트를 만나보세요
            </Typography>
            <div className={styles['descript-box']}>
              <Typography as="h3" variant="content-large" weight="bold">
                시작하기 전에
              </Typography>
              <div className={styles['descript-content']}>
                <div className={styles['descript-number']}>
                  <Typography as="div" variant="content-large" weight="medium">
                    1
                  </Typography>
                </div>
                <Typography className={styles['descript-text']} as="p" variant="content-medium" weight="medium">
                  자주 이용하는 운동 장소를 등록해 주세요
                </Typography>
              </div>
              <div className={styles['descript-content']}>
                <div className={styles['descript-number']}>
                  <Typography as="div" variant="content-large" weight="medium">
                    2
                  </Typography>
                </div>
                <Typography className={styles['descript-text']} as="p" variant="content-medium" weight="medium">
                  지도에서 내 주변에 있는 운동 메이트를 확인하세요{' '}
                </Typography>
              </div>
              <div className={styles['descript-content']}>
                <div className={styles['descript-number']}>
                  <Typography as="div" variant="content-large" weight="medium">
                    3
                  </Typography>
                </div>
                <Typography className={styles['descript-text']} as="p" variant="content-medium" weight="medium">
                  채팅 신청은 근처 메이트에게만 가능해요! 실제 운동가능한 거리의 메이트와 채팅을 시작하세요
                </Typography>
              </div>
            </div>
            <button
              className={styles['descript-button']}
              onClick={() => {
                localStorage.setItem(MATCH_GUIDE_KEY, 'true')
                router.push(SITE_MAP.MATCH_OPEN_CHAT_CREATE)
              }}
            >
              <Typography as="div" variant="content-large" weight="bold">
                운동 장소 등록하기
              </Typography>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles['map-container']}>
          <div className={styles['header']}>
            <Link href={SITE_MAP.MATCH_PLACE_LIST} className={styles['places-button']}>
              <Typography as="span" variant="content-large" weight="bold">
                운동장소 목록
              </Typography>
              <RightArrow />
            </Link>
            <FilterBar filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
          </div>

          <KakaoMap filters={filters} />
          <BottomNavigation />
        </div>
      )}
    </div>
  )
}
