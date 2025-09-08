'use client'

import { useAuth } from 'react-oidc-context'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useReadRegistered } from '@/hooks/useAuthApi'
import LoadingScreen from '@/components/commons/loadingScreen'
import SITE_MAP from '@/constants/siteMap.constant'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { data: registeredData, isLoading: isRegisteredLoading } =
    useReadRegistered(auth.isAuthenticated)
  const loading = auth.isLoading || isRegisteredLoading

  useEffect(() => {
    // 인증정보 로딩중
    if (auth.isLoading) {
      return
    }

    // 소셜로그인 미인증 유저
    if (!auth.isAuthenticated) {
      router.replace(SITE_MAP.LOGIN)
      return
    }

    // 회원가입 정보 로딩중
    if (isRegisteredLoading || !registeredData) {
      return
    }

    // 미가입 유저
    if (!registeredData.isRegistered) {
      router.replace(SITE_MAP.AGREEMENT)
      return
    }

    // 소셜로그인, 회원가입 유저가 '/' 경로에 있는경우
    if (pathname === '/') {
      router.replace(SITE_MAP.EXERCISE)
      return
    }
  }, [
    auth.isLoading,
    auth.isAuthenticated,
    isRegisteredLoading,
    registeredData,
    pathname,
  ])

  if (loading) return <LoadingScreen />

  return <>{children}</>
}
