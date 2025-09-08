'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.error('Service Worker 등록 실패:', err)
      })
      console.log('Service Worker 등록 완료')
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          console.log(
            '새로운 버전이 활성화되었습니다. 페이지를 새로고침합니다.',
          )
          window.location.reload()
          refreshing = true
        }
      })
    }
  }, [])

  return null
}
