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
  const setRegistered = useRegistrationStore((state) => state.setRegistered)

  useEffect(() => {
    // 로그인 관련 페이지 AuthGuard 미적용
    if (pathname.startsWith('/auth')) {
      return
    }

    // 인증 로딩중
    if (auth.isLoading) return

    // 인증안된유저
    if (!auth.isAuthenticated) {
      router.replace(SITE_MAP.LOGIN)
      return
    }

    // 인증완료, 등록 여부파악 못함
    if (auth.isAuthenticated && isRegistered === null) {
      ;(async () => {
        try {
          // const isRegistered = await registrationStatus()
          const isRegistered = true //임시
          setRegistered(isRegistered)
        } catch {
          router.replace(SITE_MAP.LOGIN)
        }
      })()
      return
    }

    // 인증완료, 미등록 유저
    if (
      auth.isAuthenticated &&
      isRegistered === false &&
      pathname !== SITE_MAP.AGREEMENT
    ) {
      router.replace(SITE_MAP.AGREEMENT)
      return
    }

    // 인증완료, 가입유저
    if (auth.isAuthenticated && isRegistered === true) {
      router.replace(SITE_MAP.TEMP1)
      return
    }
  }, [auth.isLoading, auth.isAuthenticated, isRegistered])

  if (pathname.startsWith('/auth')) {
    return <>{children}</>
  }

  if (auth.isLoading || (auth.isAuthenticated && isRegistered === null))
    return null

  return <>{children}</>
}
