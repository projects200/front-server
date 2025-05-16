'use client'

import Link from 'next/link'

import ProtectedRoute from '@/components/commons/protectedRoute'
import SITE_MAP from '@/constants/siteMap.constant'

export default function Temp() {
  return (
    <ProtectedRoute>
      <div>
        <div>임시 메인 페이지2</div>
        <Link href={SITE_MAP.TEMP1}>임시페이지로 이동</Link>
      </div>
    </ProtectedRoute>
  )
}
