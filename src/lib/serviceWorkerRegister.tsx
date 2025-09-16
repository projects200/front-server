'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker 등록 완료:')
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            console.log('새로운 서비스 워커 발견:')

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  console.log('새로운 워커 설치 완료. 활성화를 시작합니다.')
                  newWorker.postMessage({ type: 'SKIP_WAITING' })
                }
              })
            }
          })
        })
        .catch((err) => {
          console.error('Service Worker 등록 실패:', err)
        })

      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          console.log('새로운 버전 활성화 완료. 페이지를 새로고침합니다.')
          window.location.reload()
          refreshing = true
        }
      })
    }
  }, [])

  return null
}
