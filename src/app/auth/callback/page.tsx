'use client'

import { useAuth } from 'react-oidc-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ApiError } from '@/types/common'
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
      showToast('로그인 정보가 없습니다.', 'info')
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
      } catch (err: unknown) {
        if (err instanceof ApiError) {
          if (err.status === 401) {
            showToast('인증이 만료되었습니다. 다시 로그인해주세요.', 'info')
          } else {
            showToast(err.message, 'info')
          }
        } else if (err instanceof Error) {
          showToast(err.message, 'info')
        } else {
          showToast('서버 오류가 발생했습니다.', 'info')
        }
        router.replace(SITE_MAP.LOGIN)
      }
    })()
  }, [auth.isLoading, auth.isAuthenticated])

  return null
}
