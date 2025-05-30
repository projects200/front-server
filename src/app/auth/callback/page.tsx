'use client'

import { useAuth } from 'react-oidc-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/hooks/useToast'
import { useAuthApi } from '@/api/auth'
import { useRegistrationStore } from '@/store/useRegistrationStore'
import SITE_MAP from '@/constants/siteMap.constant'

export default function CallbackPage() {
  const auth = useAuth()
  const router = useRouter()
  const showToast = useToast()
  const setRegistered = useRegistrationStore((state) => state.setRegistered)
  const { registrationStatus } = useAuthApi()

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      ;(async () => {
        try {
          const isRegistered = await registrationStatus()
          setRegistered(isRegistered)
          if (isRegistered) {
            router.replace(SITE_MAP.TEMP1)
          } else {
            router.replace(SITE_MAP.AGREEMENT)
          }
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : '회원등록 조회를 실패하였습니다.'
          showToast(message, 'info')
          router.replace(SITE_MAP.LOGIN)
        }
      })()
    }
    if (!auth.isLoading && auth.error) {
      showToast('로그인에 실패했습니다.', 'error')
      router.replace(SITE_MAP.LOGIN)
    }
  }, [auth.isLoading, auth.isAuthenticated])

  return null
}
