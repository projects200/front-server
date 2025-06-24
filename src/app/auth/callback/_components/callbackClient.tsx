'use client'

import { useQueryState } from 'nuqs'
import { useAuth } from 'react-oidc-context'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import LoadingScreen from '@/components/commons/loadingScreen'
import { useToast } from '@/hooks/useToast'
import { useReadRegistered } from '@/hooks/useAuthApi'
import SITE_MAP from '@/constants/siteMap.constant'

export default function CallbackClient () {
  const auth = useAuth()
  const router = useRouter()
  const showToast = useToast()
  const [errorDescription] = useQueryState('error_description')
  const hasBeenHandled = useRef(false)

  const { data: registeredData } = useReadRegistered(
    auth.isAuthenticated ? ['auth/isRegistered'] : null,
  )

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
  }, [auth, errorDescription])

  useEffect(() => {
    if (!registeredData) return

    if (hasBeenHandled.current) return
    hasBeenHandled.current = true

    if (registeredData.isRegistered) {
      router.replace(SITE_MAP.EXERCISE)
    } else {
      router.replace(SITE_MAP.AGREEMENT)
    }
  }, [registeredData])

  return <LoadingScreen />
}
