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
      <div className={styles['map-container']}>
        <div className={styles['header']}>
          <Link
            href={SITE_MAP.MATCH_PLACE_LIST}
            className={styles['places-button']}
          >
            <Typography as="span" variant="content-large" weight="bold">
              운동장소 목록
            </Typography>
            <RightArrow />
          </Link>
        </div>
        <KakaoMap />
        <BottomNavigation />
      </div>

      {/* 매칭 최초 진입시 안내 페이지(재사용 가능성이 있어 주석처리) */}
      {/* <div className={styles['guide-container']}>
          <Header onBack={() => router.replace(SITE_MAP.EXERCISE)}>
            운동 메이트 찾기
          </Header>
          <div className={styles['guide-content']}>
            <MascotCharacter className={styles['guide-mascot']} />
            <Typography
              className={styles['guide-title']}
              as="h2"
              variant="title-medium"
              weight="bold"
            >
              운동 메이트를 찾아보세요!
            </Typography>
            <Typography
              className={styles['guide-sub-text1']}
              as="p"
              variant="content-large"
              weight="medium"
            >
              혼자 운동하기 지루하셨나요?
            </Typography>
            <Typography
              className={styles['guide-sub-text2']}
              as="p"
              variant="content-large"
              weight="medium"
            >
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
                <Typography
                  className={styles['descript-text']}
                  as="p"
                  variant="content-medium"
                  weight="medium"
                >
                  오픈 채팅 링크를 등록해 주세요
                </Typography>
              </div>
              <div className={styles['descript-content']}>
                <div className={styles['descript-number']}>
                  <Typography as="div" variant="content-large" weight="medium">
                    2
                  </Typography>
                </div>
                <Typography
                  className={styles['descript-text']}
                  as="p"
                  variant="content-medium"
                  weight="medium"
                >
                  주요 운동 장소를 등록해 주세요
                </Typography>
              </div>
              <div className={styles['descript-content']}>
                <div className={styles['descript-number']}>
                  <Typography as="div" variant="content-large" weight="medium">
                    3
                  </Typography>
                </div>
                <Typography
                  className={styles['descript-text']}
                  as="p"
                  variant="content-medium"
                  weight="medium"
                >
                  지도에서 운동 메이트를 찾아보세요
                </Typography>
              </div>
            </div>
            <button
              className={styles['descript-button']}
              onClick={() => router.push(SITE_MAP.MATCH_OPEN_CHAT_CREATE)}
            >
              <Typography as="div" variant="content-large" weight="bold">
                시작하기
              </Typography>
            </button>
          </div>
        </div> */}
    </div>
  )
}
