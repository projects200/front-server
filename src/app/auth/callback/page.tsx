'use client'

import { useQueryState } from 'nuqs'
import { useAuth } from 'react-oidc-context'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import LoadingScreen from '@/components/commons/loadingScreen'
import FcmTokenSyncer from '@/lib/firebase/fcmTokenSyncer'
import { useToast } from '@/hooks/useToast'
import { useReadRegistered } from '@/hooks/useAuthApi'
import SITE_MAP from '@/constants/siteMap.constant'

function CallbackLogic() {
  const auth = useAuth()
  const router = useRouter()
  const showToast = useToast()
  const [errorDescription] = useQueryState('error_description')
  const hasBeenHandled = useRef(false)
  const { data: registeredData, isLoading: isRegisteredLoading } =
    useReadRegistered(auth.isAuthenticated)
  const [readyToSyncFcm, setReadyToSyncFcm] = useState(false)

  useEffect(() => {
    if (hasBeenHandled.current) return

    if (
      errorDescription &&
      errorDescription.includes('ACCOUNT_LINKED_SUCCESS')
    ) {
      hasBeenHandled.current = true
      auth.removeUser()
      showToast(
        '기존의 계정과 성공적으로 통합되었습니다.\n다시 로그인해주세요.',
        'info',
      )
      router.replace(SITE_MAP.LOGIN)
      return
    }

    if (auth.isLoading) return

    if (!auth.isAuthenticated) {
      hasBeenHandled.current = true
      showToast('로그인 정보가 만료되었습니다. 다시 로그인해주세요.', 'info')
      router.replace(SITE_MAP.LOGIN)
      return
    }
  }, [auth, errorDescription])

  useEffect(() => {
    if (isRegisteredLoading || !registeredData || hasBeenHandled.current) return
    hasBeenHandled.current = true

    if (registeredData.isRegistered) {
      setReadyToSyncFcm(true)
    } else {
      router.replace(SITE_MAP.AGREEMENT)
    }
  }, [registeredData, isRegisteredLoading])

  return (
    <FcmTokenSyncer
      shouldSync={readyToSyncFcm}
      onSyncComplete={() => {
        router.replace(SITE_MAP.EXERCISE)
      }}
    />
  )
}

export default function Callback() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {isMounted && <CallbackLogic />}
      <LoadingScreen />
    </>
  )
}
