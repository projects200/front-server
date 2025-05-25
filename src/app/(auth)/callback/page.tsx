'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/hooks/useToast'
import { userManager } from '@/lib/auth'
import { registrationStatus } from '@/api/auth'
import SITE_MAP from '@/constants/siteMap.constant'

export default function CallbackPage() {
  const showToast = useToast()
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await userManager.signinRedirectCallback()
        const isRegistered = await registrationStatus()

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
    }

    handleCallback()
  }, [])

  return null
}
