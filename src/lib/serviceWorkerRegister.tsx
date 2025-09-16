'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker 등록 완료')

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return
          
          console.log('새로운 서비스 워커 발견')

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('새로운 워커 설치 완료. 활성화를 시작합니다.')
              navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('새로운 버전 활성화 완료. 페이지를 새로고침합니다.')
                window.location.reload()
              }, { once: true });

              newWorker.postMessage({ type: 'SKIP_WAITING' })
            }
          })
        })
      } catch (err) {
        console.error('Service Worker 등록 실패:', err)
      }
    }

    registerServiceWorker()
  }, [])

  return null
}