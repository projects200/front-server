'use client'

import { useAuth } from 'react-oidc-context'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRegistrationStore } from '@/store/useRegistrationStore'

import SITE_MAP from '@/constants/siteMap.constant'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isRegistered = useRegistrationStore((state) => state.isRegistered)

  useEffect(() => {
    console.log(1)
    // 인증 로딩중
    if (auth.isLoading) return
    console.log(2)
    // 인증안된유저
    if (!auth.isAuthenticated) {
      router.replace(SITE_MAP.LOGIN)
      return
    }
    console.log(3)
    // 인증완료, 등록 여부파악 못함
    if (auth.isAuthenticated && isRegistered === null) {
      return
    }
    console.log(4)
    // 인증완료, 미등록 유저
    if (
      auth.isAuthenticated &&
      isRegistered === false &&
      pathname !== SITE_MAP.AGREEMENT
    ) {
      router.replace(SITE_MAP.AGREEMENT)
      return
    }
    console.log(5)
    // 인증완료, 가입유저, 로그인관련 페이지에 있는경우
    if (
      auth.isAuthenticated &&
      isRegistered === true &&
      ['/login', '/', SITE_MAP.AGREEMENT].includes(pathname)
    ) {
      router.replace(SITE_MAP.TEMP1)
      return
    }
  }, [auth.isLoading, auth.isAuthenticated, isRegistered])

  if (pathname === '/callback') {
    return <>{children}</>
  }

  if (auth.isLoading || (auth.isAuthenticated && isRegistered === null))
    return null

  return <>{children}</>
}
