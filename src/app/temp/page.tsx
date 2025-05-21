'use client'

import Link from 'next/link'

import { signOutRedirect } from '@/lib/auth'
import ProtectedRoute from '@/components/commons/protectedRoute'
import SITE_MAP from '@/constants/siteMap.constant'

export default function Temp() {
  const handleSignOut = async () => {
    await signOutRedirect()
  }
  return (
    <ProtectedRoute>
      <div>
        <div>임시 메인 페이지</div>
        <button onClick={handleSignOut}>Logout</button>
        <Link href={SITE_MAP.TEMP2}>임시페이지2로 이동</Link>
      </div>
    </ProtectedRoute>
  )
}
