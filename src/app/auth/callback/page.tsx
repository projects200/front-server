'use client'

import { useAuth } from 'react-oidc-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/hooks/useToast'
import { useAuthApi } from '@/hooks/useAuthApi'
import SITE_MAP from '@/constants/siteMap.constant'

export default function CallbackPage() {
  const auth = useAuth()
  const router = useRouter()
  const showToast = useToast()
  const { checkRegistered } = useAuthApi()

  useEffect(() => {
    if (auth.isLoading) return

    if (!auth.isAuthenticated) {
      showToast('로그인 정보가 없습니다.', 'error')
      router.replace(SITE_MAP.LOGIN)
      return
    }

    ;(async () => {
      try {
        const data = await checkRegistered()
        if (data.isRegistered) {
          router.replace(SITE_MAP.TEMP1)
        } else {
          router.replace(SITE_MAP.AGREEMENT)
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : '회원등록 조회 실패'
        showToast(message, 'error')
        router.replace(SITE_MAP.LOGIN)
      }
    })()
  }, [auth.isLoading, auth.isAuthenticated])

  return null
}
