'use client'

import { useQueryState } from 'nuqs'
import { useAuth } from 'react-oidc-context'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@/hooks/useToast'
import SITE_MAP from '@/constants/siteMap.constant'

import CallbackHandler from './_components/callbackHandler'

export default function CallbackPage() {
  const auth = useAuth()
  const router = useRouter()
  const showToast = useToast()
  const [errorDescription] = useQueryState('error_description')
  const hasBeenHandled = useRef(false)

  useEffect(() => {
    if (hasBeenHandled.current) return

    if (
      errorDescription &&
      errorDescription.includes('ACCOUNT_LINKED_SUCCESS')
    ) {
      hasBeenHandled.current = true
      auth.removeUser()
      showToast(
        '기존의 계정과 성공적으로 통합되었습니다. 다시 로그인해주세요.',
        'info',
      )
      router.replace(SITE_MAP.LOGIN)
      return
    }

    if (auth.isLoading) return

    if (!auth.isAuthenticated) {
      showToast('로그인 정보가 만료되었습니다.', 'info')
      router.replace(SITE_MAP.LOGIN)
      return
    }
  }, [auth, router])

  if (auth.isLoading || !auth.isAuthenticated) {
    return null
  }

  return <CallbackHandler />
}
