'use client'

import { useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { User } from 'oidc-client-ts'

import { requestFcmToken } from '@/lib/firebase/config'
import { usePostFcmToken } from '@/hooks/useFcmApi'

export default function FcmTokenManager() {
  const { events } = useAuth()
  const { trigger: registerToken } = usePostFcmToken()

  const syncFcmToken = async () => {
    const fcmToken = await requestFcmToken()

    if (fcmToken) {
      sessionStorage.setItem('fcm_token', fcmToken)

      try {
        await registerToken(fcmToken)
      } catch {
        console.log('FCM 토큰 등록 오류')
      }
    }
  }
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) =>
            console.log('Service Worker 등록 성공:', registration.scope),
          (err) => console.error('Service Worker 등록 실패:', err),
        )
      })
    }
  }, [])

  // 로그인시, 엑세스 토큰 갱신시 실행됨
  useEffect(() => {
    const handleUserLoaded = (user: User | null) => {
      if (user) {
        syncFcmToken()
      }
    }

    events.addUserLoaded(handleUserLoaded)

    return () => {
      events.removeUserLoaded(handleUserLoaded)
    }
  }, [events])

  return null
}

// 현재는 로그인시, 엑세스 토큰 갱신시마다 FCM 토큰을 백엔드로 전송하지만
// 발급받은 FCM 토큰을 로컬스토리지에 저장해두고 FCM 토큰값이 바뀌었을때
// 백엔드로 보내도록 로직이 바뀔 가능성이 있기에 아래 코드를 남겨두었습니다.

// // 1. 이전에 서버로 보냈던 토큰을 localStorage에서 가져옵니다.
// const lastSyncedToken = localStorage.getItem('fcmToken')

// // 2. 현재 토큰과 마지막으로 동기화한 토큰이 다를 경우에만 서버로 전송합니다.
// if (currentFcmToken !== lastSyncedToken) {
//   console.log(
//     '새로운 FCM 토큰이거나, 마지막 동기화 토큰과 다릅니다. 서버로 전송합니다.',
//   )
//   try {
//     // await registerToken({ fcmToken: currentFcmToken })
//     localStorage.setItem('fcmToken', currentFcmToken)
//   } catch (error) {
//     console.error('FCM 토큰 서버 동기화 실패:', error)
//   }
// } else {
//   console.log('FCM 토큰이 이미 최신 상태입니다. 추가 전송은 하지 않습니다.')
// }
