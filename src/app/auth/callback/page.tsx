'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from 'react-oidc-context'

import FcmTokenSyncer from '@/lib/firebase/fcmTokenSyncer'
import { useReadRegistered } from '@/hooks/api/useAuthApi'
import { useToast } from '@/hooks/useToast'
import LoadingScreen from '@/components/commons/loadingScreen'
import SITE_MAP from '@/constants/siteMap.constant'

function CallbackLogic() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const showToast = useToast()
  const auth = useAuth()
  const [isCompletedStep1, setIsCompletedStep1] = useState(false)
  const [isCompletedStep2, setIsCompletedStep2] = useState(false)
  const [processLock, setProcessLock] = useState(false)
  const {
    data: registeredData,
    isLoading: isRegisteredLoading,
    error: registrationError,
  } = useReadRegistered(isCompletedStep1)

  // 1단계: 페이지 진입 시 OIDC 콜백 처리를 실행합니다.
  useEffect(() => {
    const step1 = async () => {
      if (processLock || isCompletedStep1 || auth.isLoading) return

      const errorDescription = searchParams.get('error_description')
      if (errorDescription?.includes('ACCOUNT_LINKED_SUCCESS')) {
        showToast(
          '기존의 계정과 성공적으로 통합되었습니다.\n다시 로그인해주세요.',
          'info',
        )
        setProcessLock(true)
        await auth.removeUser()
        router.replace(SITE_MAP.LOGIN)
        return
      }

      if (auth.error) {
        showToast(
          '로그인 과정에 문제가 발생했습니다. 다시 시도해주세요.',
          'info',
        )
        router.replace(SITE_MAP.LOGIN)
        return
      }

      if (auth.isAuthenticated) {
        setIsCompletedStep1(true)
        return
      }

      if (!auth.isLoading && !auth.isAuthenticated) {
        showToast(
          '로그인 과정에 문제가 발생했습니다. 다시 시도해주세요.',
          'info',
        )
        router.replace(SITE_MAP.LOGIN)
      }
    }

    step1()
  }, [auth, router, isCompletedStep1, searchParams])

  // 2단계: 사용자 등록 여부 확인 결과에 따라 분기 처리합니다.
  useEffect(() => {
    const step2 = async () => {
      if (
        processLock ||
        !isCompletedStep1 ||
        isRegisteredLoading ||
        !registeredData
      )
        return

      if (registrationError) {
        setProcessLock(true)
        await auth.removeUser()
        router.replace(SITE_MAP.LOGIN)
        return
      }

      if (registeredData.isRegistered) {
        setIsCompletedStep2(true)
      } else {
        router.replace(SITE_MAP.AGREEMENT)
      }
    }
    step2()
  }, [
    isCompletedStep1,
    registeredData,
    isRegisteredLoading,
    registrationError,
    router,
    auth,
  ])

  // 3단계: FcmTokenSyncer 컴포넌트를 렌더링합니다.
  if (isCompletedStep2) {
    return (
      <FcmTokenSyncer
        shouldSync={true}
        onSyncComplete={() => {
          router.replace(SITE_MAP.EXERCISE)
        }}
      />
    )
  }

  return <LoadingScreen />
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CallbackLogic />
    </Suspense>
  )
}
