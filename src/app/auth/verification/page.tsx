'use client'

import { useAuth } from 'react-oidc-context'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import LoadingScreen from '@/components/commons/loadingScreen'
import FcmTokenSyncer from '@/lib/firebase/fcmTokenSyncer'
import { useReadRegistered } from '@/hooks/useAuthApi'
import SITE_MAP from '@/constants/siteMap.constant'
import AuthGuard from '@/app/_components/authGuard'

function VerificationLogic() {
  const auth = useAuth()
  const router = useRouter()

  const { data: registeredData, isLoading: isRegisteredLoading } =
    useReadRegistered(auth.isAuthenticated)

  const [readyToSyncFcm, setReadyToSyncFcm] = useState(false)

  useEffect(() => {
    if (isRegisteredLoading || !registeredData) return

    if (registeredData.isRegistered) {
      setReadyToSyncFcm(true)
    } else {
      router.replace(SITE_MAP.AGREEMENT)
    }
  }, [registeredData, isRegisteredLoading, router])

  if (readyToSyncFcm) {
    return (
      <FcmTokenSyncer
        shouldSync={true}
        onSyncComplete={() => {
          router.replace(SITE_MAP.EXERCISE)
        }}
      />
    )
  }

  return null
}

export default function VerificationPage() {
  return (
    <AuthGuard>
      <LoadingScreen />
      <VerificationLogic />
    </AuthGuard>
  )
}
