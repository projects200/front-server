'use client'

import Link from 'next/link'

import SITE_MAP from '@/constants/siteMap.constant'

export default function Exercise() {
  return (
    <>
      <div style={{ textAlign: 'center' }}>임시 메인 페이지</div>
      <div>
        <Link href={SITE_MAP.SETTINGS} scroll={false}>
          설정페이지
        </Link>
      </div>
      <div>
        <Link
          // 임시날짜 전달
          href={`${SITE_MAP.EXERCISE_LIST}?date=2025-06-10`}
          scroll={false}
        >
          운동기록 리스트
        </Link>
      </div>
    </>
  )
}
