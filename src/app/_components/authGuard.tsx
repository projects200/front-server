'use client'

import { useAuth } from 'react-oidc-context'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import SITE_MAP from '@/constants/siteMap.constant'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 인증 로딩중
    if (auth.isLoading) return

    // 인증안된유저
    if (!auth.isAuthenticated) {
      router.replace(SITE_MAP.LOGIN)
      return
    }

    // 인증완료, 가입유저가 "/"에 있는경우
    if (auth.isAuthenticated && pathname === '/') {
      router.replace(SITE_MAP.EXERCISE)
      return
    }
  }, [auth.isLoading, auth.isAuthenticated])

  if (auth.isLoading) return null

  return <>{children}</>
}
