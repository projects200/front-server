'use client'

import { useEffect, useState } from 'react'

import { requestFcmToken } from '@/lib/firebase/config'
import { usePostFcmToken } from '@/hooks/useFcmApi'

type FcmTokenSyncerProps = {
  shouldSync: boolean
  onSyncComplete: () => void
}

export default function FcmTokenSyncer({
  shouldSync,
  onSyncComplete,
}: FcmTokenSyncerProps) {
  const { trigger: registerToken, isMutating } = usePostFcmToken()
  const [hasSynced, setHasSynced] = useState(false)

  useEffect(() => {
    if (shouldSync && !hasSynced && !isMutating) {
      const sync = async () => {
        try {
          const fcmToken = await requestFcmToken()
          if (fcmToken) {
            sessionStorage.setItem('fcm_token', fcmToken)
            await registerToken(fcmToken)
          }
          setHasSynced(true)
          onSyncComplete()
        } catch (error) {
          console.error('FCM 등록 오류 : ', error)
          onSyncComplete()
        }
      }

      sync()
    }
  }, [shouldSync, hasSynced, isMutating, registerToken, onSyncComplete])

  return null
}
