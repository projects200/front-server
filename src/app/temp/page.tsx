'use client'

import Link from 'next/link'

import ProtectedRoute from '@/components/commons/protectedRoute'
import SITE_MAP from '@/constants/siteMap.constant'

export default function Temp() {
  return (
    <ProtectedRoute>
      <div>
        <div>임시 메인 페이지</div>
        <Link href={SITE_MAP.SETTINGS}>설정페이지</Link>
      </div>
    </ProtectedRoute>
  )
}
